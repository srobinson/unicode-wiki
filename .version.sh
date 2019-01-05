#!/bin/bash

echo TRAVIS_BRANCH: $TRAVIS_BRANCH

if [[ $TRAVIS_BRANCH == 'master' ]]; then

  # L1v3rpooltravis-alphab

  # const token="20a3718a3b480b957b190f435ce07a091a98c008"

  # echo "Access Token:" $TRAVIS_TOKEN
  # echo "Access Token:" $token

  # uw-travis: 20a3718a3b480b957b190f435ce07a091a98c008

  git config --global user.email "travis@alphab.io"
  git config --global user.name "travis-alphab"
  # git config --global github.user "srobinson"
  # git config --global github.token 20a3718a3b480b957b190f435ce07a091a98c008

  # curl -H "Authorization: token 20a3718a3b480b957b190f435ce07a091a98c008" https://github.com/srobinson/unicode-wiki > /dev/null

  # git remote show origin

  git remote set-url origin https://srobinson:${TRAVIS_PASS}@github.com/srobinson/unicode-wiki.git

  # git remote show origin

  # get current version
  v=$(git describe --tags `git rev-list --tags --max-count=1`)
  # get last commit
  m=`git show --pretty`

  if grep -q 'BREAKING\CHANGE:' <<< $m; then
    nv=`./.increment_version.sh -M ${v#"v"}`
  elif grep -q feat\([a-z]*\): <<< $m; then
    nv=`./.increment_version.sh -m ${v#"v"}`
  else
    nv=`./.increment_version.sh -p ${v#"v"}`
  fi

  echo "Fixing git setup for $TRAVIS_BRANCH"
  git checkout ${TRAVIS_BRANCH}
  git branch -u origin/${TRAVIS_BRANCH}
  git config branch.${TRAVIS_BRANCH}.remote origin
  git config branch.${TRAVIS_BRANCH}.merge refs/heads/${TRAVIS_BRANCH}
  git status
  git stash


  npx oao publish --no-confirm --new-version v$nv
  # ./deploy.sh

fi

# 0.0.1
# feat: A new feature 0.1.0
# fix: A bug fix 0.1.1
# docs: Documentation only changes 0.1.2
# style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 0.1.3
# refactor: A code change that neither fixes a bug nor adds a feature
# perf: A code change that improves performance
# test: Adding missing or correcting existing tests
# chore: Changes to the build process or auxiliary tools and libraries such as documentation generation


ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
