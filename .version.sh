#!/bin/bash

if [[ $TRAVIS_BRANCH != 'master' ]]; then
  echo $TRAVIS_BRANCH: nothing to deploy. Finishing build...
else

  # get latest version
  v=$(git describe --tags `git rev-list --tags --max-count=1`)

  echo current version: $v

  # get last commit
  m=`git log --format=%B -n 1`

  echo $m

  # 0.0.1
  # feat: A new feature 0.1.0
  # fix: A bug fix 0.1.1
  # docs: Documentation only changes 0.1.1
  # style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 0.1.1
  # refactor: A code change that neither fixes a bug nor adds a feature 0.1.1
  # perf: A code change that improves performance 0.1.2
  # test: Adding missing or correcting existing tests 0.1.2
  # chore: Changes to the build process or auxiliary tools and libraries such as documentation generation 0.1.2
  # BREAKING CHANGE: 0.2.0
  if [[ -n $(awk '/BREAKING\sCHANGE:/' <<< $m) ]]; then
    iv="major"
  elif [[ -n $(awk '/feat\([a-z]*\):/' <<< $m) ]]; then
    iv="minor"
  elif [[ -n $(awk '/[fix|perf]\([a-z]*\):/' <<< $m) ]]; then
    iv="patch"
  else
    echo Nothing to release. Skipping build....
  fi

  echo increment version: $iv

  if [[ -n $iv ]]; then

    echo "Fixing git setup for $TRAVIS_BRANCH"
    git checkout ${TRAVIS_BRANCH}
    git branch -u origin/${TRAVIS_BRANCH}
    git config branch.${TRAVIS_BRANCH}.remote origin
    git config branch.${TRAVIS_BRANCH}.merge refs/heads/${TRAVIS_BRANCH}

    # print status
    npx oao status

    # TODO: use personal access tokens for auth
    git remote set-url origin https://srobinson:${TRAVIS_PASS}@github.com/srobinson/unicode-wiki.git

    # create release
    npx oao publish --no-confirm --no-check-uncommitted --increment-version-by $iv

    git tag -s $(git describe --tags) -m $m -f

    # sanity revert change for testing locally
    git remote set-url origin git@github.com:srobinson/unicode-wiki.git

    . ./.deploy.sh

  fi

fi
