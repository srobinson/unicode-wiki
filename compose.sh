#!/bin/bash

# https://matthiasnoback.nl/2017/03/bash-practices-input-validation-and-local-variables/

# WAIT FOR IT
# https://gist.github.com/rochacbruno/bdcad83367593fd52005

compose {

  docker-compose \
    -f ./.docker-compose/mongo.yml \
    -f ./.docker-compose/elastic-search.yml \
    -f ./.docker-compose/kibana.yml \
    $1
  # -f ./.docker-compose/logstash.yml \
    return 1
}

compose up

ERROR_CODE=$?

if [ $ERROR_CODE -eq 1 ]; then
  compose down
fi

