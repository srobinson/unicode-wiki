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

function deploy() {
  if ! docker images | grep -v 'grep' | grep -q "$1.*$2"; then
    echo "building gcr.io/unicode-wiki/uw-$1:$2 ..."
    docker build -f Dockerfile.$1 -t gcr.io/unicode-wiki/uw-$1:$2 . || exit 3
    echo "docker build gcr.io/unicode-wiki/uw-$1:$2 complete"
  fi
  if ! gcloud container images list-tags gcr.io/unicode-wiki/uw-$1 | grep -v 'grep' | grep -q "$1.*$2"; then
    echo "pushing gcr.io/unicode-wiki/uw-$1:$2"
    docker push gcr.io/unicode-wiki/uw-$1:$2 || exit 3
    echo "gcr.io/unicode-wiki/uw-$1:$2 pushed"
    kubectl set image deployment/uw-$1-web uw-$1-web=gcr.io/unicode-wiki/uw-$1:$2 || exit 3
    echo "gcr.io/unicode-wiki/uw-$1:$2 deployed"
  fi
}

if [ $? = 3 ]
then
  >&2 echo error
fi

deploy api $(read_var VERSION_API .env)
deploy app $(read_var VERSION_APP .env)

