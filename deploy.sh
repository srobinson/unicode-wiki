#!/bin/bash

set -a
. .env.prod
set +a

deploy() {
  if ! docker images | grep -v 'grep' | grep "$1.*$2"; then
    echo building gcr.io/unicode-wiki/uw-$1:$2 $3 $4 $5 ...
    if [ $1 == "api" ]; then
      docker build --no-cache --build-arg MONGO_URL=$3 --build-arg ES_URL=$4 -f Dockerfile.$1 -t gcr.io/unicode-wiki/uw-$1:$2 . || exit 3
    elif [ $1 == "api-graph" ]; then
      docker build --no-cache --build-arg API_URL=$3 --build-arg GRAPHQL_URL=$4 -f Dockerfile.$1 -t gcr.io/unicode-wiki/uw-$1:$2 . || exit 3
    elif [ $1 == "app" ]; then
      docker build --no-cache --build-arg API_URL=$3 --build-arg FONTS_URL=$4 --build-arg ANALYTICS_ID=$5 -f Dockerfile.$1 -t gcr.io/unicode-wiki/uw-$1:$2 . || exit 3
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

# deploy api \
#   $VERSION_API \
#   $MONGO_URL \
#   $ES_URL

deploy api-graph \
  $VERSION_API_GRAPH \
  $API_URL \
  $GRAPHQL_URL

# deploy app \
#   $VERSION_APP \
#   $API_URL \
#   $FONTS_URL \
#   $ANALYTICS_ID

