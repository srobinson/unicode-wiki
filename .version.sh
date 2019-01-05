#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]]
  v=$(git describe --tags `git rev-list --tags --max-count=1`)
  npx oao publish --no-confirm --new-version $v
  exec ./deploy.sh
fi
