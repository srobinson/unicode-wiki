#!/bin/bash

read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

function deploy() {
  if ! docker images | grep -v 'grep' | grep -q "$1.*$2"; then
    echo "building gcr.io/unicode-wiki/uw-$1:$2 ..."
    docker build -f Dockerfile.$1 -t gcr.io/unicode-wiki/uw-$1:$2 .
    echo "docker build gcr.io/unicode-wiki/uw-$1:$2 complete"
  fi
  if ! gcloud container images list-tags gcr.io/unicode-wiki/uw-$1 | grep --q $2; then
    echo "pushing gcr.io/unicode-wiki/uw-$1:$2"
    docker push gcr.io/unicode-wiki/uw-$1:$2
    echo "gcr.io/unicode-wiki/uw-$1:$2 pushed"
    kubectl set image deployment/uw-$1-web uw-$1-web=gcr.io/unicode-wiki/uw-$1:$2
    echo "gcr.io/unicode-wiki/uw-$1:$2 deployed"
  fi
}

deploy api $(read_var VERSION_API .env)
deploy app $(read_var VERSION_APP .env)

