#!/bin/bash

set -a
. .env.prod
if [ -e .env.prod.secrets ]; then
  . .env.prod.secrets
fi
set +a

workspace_status=$(npx oao status)
packages_re='(@uw/[a-z-]+)\s+.{9}([0-9]+\.[0-9]+\.[0-9]+)'
packages=$(echo $workspace_status | grep -oEi $packages_re | sed -r "s:\x1B\[[0-9;]*[mK]::g")
packages_arr=($(echo $packages | tr " " "\n"))

auth() {
  echo HOME $HOME
  echo CASHER_DIR $CASHER_DIR

  ls -l -- "$HOME"
  ls -l -- "$CASHER_DIR"

  echo "$HOME/docker"
  ls -l -- "$HOME/docker"

  echo google-cloud-sdk
  ls -l -- "$HOME/google-cloud-sdk"

  echo /var/lib/docker
  ls -l /var/lib/docker

  if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com | bash > /dev/null; fi

  echo google-cloud-sdk
  ls -l -- "$HOME/google-cloud-sdk"

  source /home/travis/google-cloud-sdk/path.bash.inc
  gcloud version
  gcloud --quiet components update kubectl
  echo $GCLOUD_KEY | base64 --decode > gcloud.p12
  gcloud auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.p12
  ssh-keygen -f ~/.ssh/google_compute_engine -N ""

  # gcloud config list
  gcloud config list

  gcloud --quiet config set project unicode-wiki
  gcloud --quiet config set container/cluster uw-cluster
  gcloud --quiet config set compute/zone us-east1-b
  gcloud --quiet config set container/use_application_default_credentials true
  gcloud container clusters get-credentials uw-cluster --zone=us-east1-b

  gcloud auth configure-docker

  echo gcloud config list
  gcloud config list

  echo DOCKER INFO
  docker info

  echo kubectl get pods
  kubectl get pods

}

version() {
  VERSION_PACKAGES=$(docker run gcr.io/unicode-wiki/uw-packages cat package.json | jq '.version' | sed 's/"//g')
  cds=$(docker run gcr.io/unicode-wiki/uw-packages cat package.json | jq '.dependencies')
  pds=$(cat package.json | jq '.dependencies')
  diff=$(echo [$cds, $pds] | json_diff)
  echo diff $diff
  if [ $diff != "[]" ]; then
    VERSION_PACKAGES=$(cat package.json | jq '.version' | sed 's/"//g')
  fi
}

build() {

  docker images

  if  ! docker images | grep -v 'grep' | grep "uw-$1\s.*$2"; then
    echo building gcr.io/unicode-wiki/uw-$1:$2

    docker build \
      --label "image=$1" \
      --label "version=$2" \
      --build-arg ANALYTICS_ID=$ANALYTICS_ID \
      --build-arg API_PORT=$API_PORT \
      --build-arg API_URL=$API_URL \
      --build-arg ES_URL=$ES_URL \
      --build-arg FONTS_URL=$FONTS_URL \
      --build-arg GRAPHQL_PORT=$GRAPHQL_PORT \
      --build-arg GRAPHQL_URL=$GRAPHQL_URL \
      --build-arg MONGO_URL=$MONGO_URL \
      --build-arg SEARCH_SERVICE_PORT=$SEARCH_SERVICE_PORT \
      --build-arg SEARCH_URL=$SEARCH_URL \
      --build-arg WIKI_URL=$WIKI_URL \
      --build-arg WIKI_SERVICE_PORT=$WIKI_SERVICE_PORT \
      -f .build/Dockerfile.$1 \
      -t gcr.io/unicode-wiki/uw-$1:$2 \
      . || exit 3

    if [[ $3 == "latest" ]]; then
      docker tag gcr.io/unicode-wiki/uw-$1:$2 gcr.io/unicode-wiki/uw-$1:latest
    fi

    echo docker build gcr.io/unicode-wiki/uw-$1:$2 complete
  fi
}

push() {
  if ! gcloud container images list-tags gcr.io/unicode-wiki/uw-$1 | grep -v 'grep' | grep "$2"; then
    echo pushing gcr.io/unicode-wiki/uw-$1:$2
    docker push gcr.io/unicode-wiki/uw-$1:$2 || exit 3
    echo gcr.io/unicode-wiki/uw-$1:$2 pushed
  fi
}

deploy() {
  echo DEPLOYING..
  if ! kubectl get deployment/uw-$1-web -o=json | jq '.spec.template.spec.containers[0].image' | grep -v 'grep' | grep "$2"; then
    kubectl set image deployment/uw-$1-web uw-$1-web=gcr.io/unicode-wiki/uw-$1:$2 || exit 3
    echo gcr.io/unicode-wiki/uw-$1:$2 deployed
  fi
}

services() {
  len=${#packages_arr[@]}
  for (( i=0; i<=$len; i = i + 2 ))
  do
    package=${packages_arr[$i]#"@uw/"}
    version=${packages_arr[$i+1]#}
    if [[ ${#package} -gt 0 && $package =~ ^(.+)?(app|api|api-graph|-service)$ ]]; then
      str="$1 $package $version"
      eval $str
    fi
  done
}

if [ $? = 3 ]
then
  >&2 echo error
fi

auth
version

build base \
  $VERSION_BASE \
  latest

build assets \
  $VERSION_ASSETS \
  latest

build packages \
  $VERSION_PACKAGES \
  latest

services build
services push
services deploy
