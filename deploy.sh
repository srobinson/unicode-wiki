#!/bin/bash

set -a
. .env.prod
set +a

build() {

  if ! docker images | grep -v 'grep' | grep "$1\s.*$2"; then

    echo building gcr.io/unicode-wiki/uw-$1:$2

    docker build \
      --label "image=$1" \
      --label "version=$2" \
      --build-arg ANALYTICS_ID=$ANALYTICS_ID \
      --build-arg API_URL=$API_URL \
      --build-arg ES_URL=$ES_URL \
      --build-arg FONTS_URL=$FONTS_URL \
      --build-arg GRAPHQL_PORT=$GRAPHQL_PORT \
      --build-arg GRAPHQL_URL=$GRAPHQL_URL \
      --build-arg MONGO_URL=$MONGO_URL \
      --build-arg SEARCH_URL=$SEARCH_URL \
      --build-arg VERSION_BASE=$VERSION_BASE \
      --build-arg VERSION_ASSETS=$VERSION_ASSETS \
      --build-arg VERSION_PACKAGES=0.0.1 \
      --build-arg WIKI_URL=$WIKI_URL \
      -f .build/Dockerfile.$1 \
      -t gcr.io/unicode-wiki/uw-$1:$2 \
      . || exit 3

    if [ $3 = "latest" ]; then
      docker tag gcr.io/unicode-wiki/uw-$1:$2 gcr.io/unicode-wiki/uw-$1:latest
    fi

    echo docker build gcr.io/unicode-wiki/uw-$1:$2 complete
  fi
}

deploy() {
  build "$@"

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

build base \
  $VERSION_BASE \
  latest

build assets \
  $VERSION_ASSETS \
  latest

build packages \
  $VERSION_PACKAGES \
  latest

deploy api \
  $VERSION_API

deploy search-service \
  $VERSION_SEARCH_SERVICE

deploy wiki-service \
  $VERSION_WIKI_SERVICE

deploy api-graph \
  $VERSION_API_GRAPH

deploy app \
  $VERSION_APP

