#!/bin/bash

compose {

  docker-compose \
    -f ./.docker-compose/mongo.yml \
    -f ./.docker-compose/elastic-search.yml \
    -f ./.docker-compose/kibana.yml \
    -f ./.docker-compose/logstash.yml \
    $1
    return 1
}

compose up

ERROR_CODE=$?

if [ $ERROR_CODE -eq 1 ]; then
  >&2 echo error
  compose down
fi

