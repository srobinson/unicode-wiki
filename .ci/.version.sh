#!/bin/bash

set -e

if [[ $TRAVIS_BRANCH == 'master' ]]; then

  echo "Fixing git setup for $TRAVIS_BRANCH"
  git checkout ${TRAVIS_BRANCH}
  git branch -u origin/${TRAVIS_BRANCH}
  git config branch.${TRAVIS_BRANCH}.remote origin
  git config branch.${TRAVIS_BRANCH}.merge refs/heads/${TRAVIS_BRANCH}

  git remote set-url origin https://${TRAVIS_TOKEN}@github.com/srobinson/unicode-wiki.git

  # print status
  npx oao status

  # stash artifacts created by build
  git add .
  git stash

  echo generate new package versions
  lerna version --loglevel=silly --no-commit-hooks --conventional-commits --exact --yes

  echo deploy new versions
  . ./.ci/deploy.sh

  # sanity revert change for testing locally
  git remote set-url origin git@github.com:srobinson/unicode-wiki.git

  travis_terminate 0

fi
