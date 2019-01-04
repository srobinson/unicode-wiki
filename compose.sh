#!/bin/bash

compose() {
  docker-compose \
    -f ./.docker-compose/mongo.yml \
    -f ./.docker-compose/elastic-search.yml \
    $1
}

compose ${1:-"up -d"}

ERROR_CODE=$?

if [ $ERROR_CODE -eq 1 ]; then
  >&2 echo error
  compose down
fi

# optional deps
# -f ./.docker-compose/kibana.yml \
# -f ./.docker-compose/logstash.yml \
