[![Build Status](https://travis-ci.org/srobinson/unicode-wiki.svg?branch=master)](https://travis-ci.org/srobinson/unicode-wiki)

# Unicode browser with wikipedia integration

https://unicode.wiki

![](assets/psd/screens.png?0.6562068735457673 )

## Motivation

unicode.wiki is a fully indexed, browsable and searchable dictionary of unicode characters spanning the basic and supplementary unicode planes. The project attempts to render all codepoints using sourced fonts, however in some cases you will see either a blank rendering or the missing glyph character `𞸁`. Integration with wikipedia.org is implemeted though the https://en.wikipedia.org/api/rest_v1 page api and https://en.wikipedia.org/w/api.php search api. Not all codepoints have a wiki page.

The idea behind the project has been lurking inside me for some years now, and was born out of an interest in unicode, World travel and the origin or languages.

I also wanted to experiment with a monorepo and decided to use this as a means of testing out Lerna and yarn workspaces. The excercise has taught me a great deal and I will be sharing my discoveries an upcoming blog.

References:

* http://unicode.org/
* http://www.unicode.org/standard/WhatIsUnicode.html
* http://unicode.org/charts
* https://en.wikipedia.org/api/

## Project features

* Indexed and searchable dictionary of unicode characters spanning the basic and supplementory planes sourced from http://www.unicode.org/Public/UCD/latest/
* Browsable codepoints categorized following the unicode charts spec http://www.unicode.org/charts
* Integration with wikipedia.org via api's
* Responsive, mobile first design allowing easy browsing from any device

## Core technology used


* [apollo-client] (https://github.com/apollographql/apollo-client)
* [apollo-server] (https://github.com/apollographql/apollo-server)
* [axios] (https://github.com/axios/axios)
* [downshift] (https://github.com/paypal/downshift)
* [elasticsearch] (https://github.com/elastic/elasticsearch)
* [express] (https://github.com/expressjs/express)
* [emotion] (https://github.com/emotion-js/emotion)
* [graphql] (https://graphql.org)
* [jest] (https://github.com/facebook/jest)
* [react-scripts-ts] (https://www.npmjs.com/package/react-scripts-ts)
* [mongodb] (https://github.com/mongodb/mongo)
* [mongoose] (https://github.com/Automattic/mongoose)
* [react] (https://github.com/facebook/react)
* [react-router] (https://github.com/ReactTraining/react-router)
* [redux] (https://github.com/reduxjs/redux)
* [supertest] (https://github.com/visionmedia/supertest)
* [typescript] (https://github.com/Microsoft/TypeScript)
* [winston] (https://github.com/winstonjs/winston)

## Disclaimer


This project is very early beta stage and serves as a proof of concept/exploration of Lerna monorepos. Should you discover any bugs please do create an issue/pr

## Deployment Diagram

![](assets/psd/deployment-diagram.4k.png?0.36817197259025214 )

# Local dev installation

If you already have mongo and elasticsearch running locally, skip ahead..

To quckly get a mongo/easticsearch environment up and running

```
./compose.sh up
```

`compose.sh up` will install and make available the following containers:

* mongo on localhost:27017
* elasticsearch on localhost:9200
* kibana on localhost:5601
* logstash on localhost:5000

Edit `compose.sh` if you do not want/require kibana/logstash

```
  docker-compose \
    -f ./.docker-compose/mongo.yml \
    -f ./.docker-compose/elastic-search.yml \
    -f ./.docker-compose/kibana.yml \
    -f ./.docker-compose/logstash.yml \
```

To cleanup when you are done:

```
# shut down composed services
./compose.sh down
```

# Starting the services


If you are not running mongo/elasticsearch on the following ports, update the config in `.env`

* mongo: 27017
* elasticsearch: 9200

```
# compile the source
yarn bootstrap

# run the web app/api server
yarn dev

# if you want to make edits with live reload
yarn watch

# alternatively run the production server
yarn start

# seed the dbs
# one time operation - seed data is persisted to disk
yarn seed
```

That's all for now... Comments/questions welcome. Thank you for reading.

