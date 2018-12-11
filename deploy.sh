#!/bin/bash

# Exit script if you try to use an uninitialized variable.
# set -o nounset

# Exit script if a statement returns a non-true return value.
# set -o errexit

# Use the error status of the first failure, rather than that of the last item in a pipeline.
# set -o pipefail

read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

deploy() {
  if ! docker images | grep -v 'grep' | grep "$1.*$2"; then
    echo building gcr.io/unicode-wiki/uw-$1:$2 $3 $4 ...
    if [ $1 == "api" ]; then
      docker build --no-cache --build-arg MONGO_URL=$3 --build-arg ES_URL=$4 -f Dockerfile.$1 -t gcr.io/unicode-wiki/uw-$1:$2 . || exit 3
    elif [ $1 == "app" ]; then
      docker build --no-cache --build-arg API_URL=$3 --build-arg FONTS_URL=$4 -f Dockerfile.$1 -t gcr.io/unicode-wiki/uw-$1:$2 . || exit 3
    fi
    echo docker build gcr.io/unicode-wiki/uw-$1:$2 complete
  fi
  if ! gcloud container images list-tags gcr.io/unicode-wiki/uw-$1 | grep -v 'grep' | grep "$2"; then
    echo pushing gcr.io/unicode-wiki/uw-$1:$2
    docker push gcr.io/unicode-wiki/uw-$1:$2 || exit 3
    echo gcr.io/unicode-wiki/uw-$1:$2 pushed
    kubectl set image deployment/uw-$1-web uw-$1-web=gcr.io/unicode-wiki/uw-$1:$2 || exit 3
    echo gcr.io/unicode-wiki/uw-$1:$2 deployed
  fi
}

if [ $? = 3 ]
then
  >&2 echo error
fi

deploy api $(read_var VERSION_API .env-prod) $(read_var MONGO_URL .env-prod) $(read_var ES_URL .env-prod)
deploy app $(read_var VERSION_APP .env-prod) $(read_var API_URL .env-prod) $(read_var FONTS_URL .env-prod)

