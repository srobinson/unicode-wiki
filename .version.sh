#!/bin/bash

set -e

if [[ $TRAVIS_BRANCH == 'master' ]]; then

  echo "Fixing git setup for $TRAVIS_BRANCH"
  git checkout ${TRAVIS_BRANCH}
  git branch -u origin/${TRAVIS_BRANCH}
  git config branch.${TRAVIS_BRANCH}.remote origin
  git config branch.${TRAVIS_BRANCH}.merge refs/heads/${TRAVIS_BRANCH}

  CHANGES=$(git --no-pager diff --name-only FETCH_HEAD $(git merge-base FETCH_HEAD master))
  echo CHANGES $CHANGES

  # get latest tage
  tag=$(git describe --tags `git rev-list --tags --max-count=1`)

  echo latest tag: $tag

  # print status
  npx oao status

  # TODO: use personal access tokens for auth
  git remote set-url origin https://srobinson:${TRAVIS_PASS}@github.com/srobinson/unicode-wiki.git

  # get gpg key
  openssl aes-256-cbc -K $encrypted_041d00b18b3a_key -iv $encrypted_041d00b18b3a_iv -in all.gpg.enc -out all.gpg -d
  gpg --import all.gpg

  # stash artifacts created by build
  git add .
  git stash

  # push new versions
  lerna version --no-commit-hooks --conventional-commits --exact --sign-git-tag --yes --push

  new_tag=$(git describe --tags `git rev-list --tags --max-count=1`)

  # sanity revert change for testing locally
  git remote set-url origin git@github.com:srobinson/unicode-wiki.git

  # deploy new versions
  if [[ $tag != $new_tag ]]; then
    . ./.deploy.sh
  fi

fi
