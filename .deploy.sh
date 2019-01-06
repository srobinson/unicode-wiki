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

version() {
  VERSION_PACKAGES=$(docker run gcr.io/unicode-wiki/uw-packages cat package.json | jq '.version' | sed 's/"//g')
  cds=$(docker run gcr.io/unicode-wiki/uw-packages cat package.json | jq '.dependencies')
  pds=$(cat package.json | jq '.dependencies')
  diff=$(jd -set <(echo "$cds") <(echo "$pds"))
  echo diff $diff
  if [ -n "$diff" ]; then
    VERSION_PACKAGES=$(cat package.json | jq '.version' | sed 's/"//g')
  fi
}

pull() {
  docker pull gcr.io/unicode-wiki/uw-base
  docker pull gcr.io/unicode-wiki/uw-assets
  docker pull gcr.io/unicode-wiki/uw-packages
}

build() {
  if  ! gcloud container images list-tags gcr.io/unicode-wiki/uw-packages | grep -v 'grep' | grep "\s$2[\s|,]"; then

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

    docker tag gcr.io/unicode-wiki/uw-$1:$2 gcr.io/unicode-wiki/uw-$1:latest

    echo docker build gcr.io/unicode-wiki/uw-$1:$2 complete
  fi
}

push() {
  if ! gcloud container images list-tags gcr.io/unicode-wiki/uw-$1 | grep -v 'grep' | grep "\s$2[\s|,]"; then
    echo pushing gcr.io/unicode-wiki/uw-$1:$2
    docker push gcr.io/unicode-wiki/uw-$1:$2
    docker push gcr.io/unicode-wiki/uw-$1:latest
    echo gcr.io/unicode-wiki/uw-$1:$2 pushed
  fi
}

deploy() {
  if [[ $package =~ ^(.+)?(app|api|api-graph|-service)$ ]]; then
    if ! kubectl get deployment/uw-$1-web -o=json | jq '.spec.template.spec.containers[0].image' | grep -v 'grep' | grep "$2"; then
      kubectl set image deployment/uw-$1-web uw-$1-web=gcr.io/unicode-wiki/uw-$1:$2
      echo gcr.io/unicode-wiki/uw-$1:$2 deployed
    fi
  fi
}

services() {
  len=${#packages_arr[@]}
  for (( i=0; i<=$len; i = i + 2 ))
  do
    package=${packages_arr[$i]#"@uw/"}
    version=${packages_arr[$i+1]#}
    if ${#package} -gt 0; then
      str="$1 $package $version"
      eval $str
    fi
  done
}

if [ $? = 3 ]
then
  >&2 echo error
fi

version

pull

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
