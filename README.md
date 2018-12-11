# Unicode Browser with Wikipedia integration

## Background and motivation

unicode.wiki is a fully indexed, browsable and searchable dictionary of unicode characters spanning the basic and supplementary planes. The project attempts to render all codepoints using sourced fonts, however in some cases you will see either a blank rendering or the `missing glyph` character `𞸁`. Integration with wikipedia.org is implemeted though the https://en.wikipedia.org/api/rest_v1 page api and https://en.wikipedia.org/w/api.php search api. Not all codepoints have a wiki page.

The idea behind the project has been lurking inside me for some years now, and was born out of an interest in unicode, languages and the origin or languages.

I also wanted to experiment with the idea of organising repos into a monorepo and decided to use this as a means of testing out Lerna and yarn workspaces. The excercise has taught me a lot! and I hope to share the love in an upcoming blog. In addition, time allowing and given enough interest, I'd like to create a tutorial covering the design/development and deployment to kubernetes. Please star/watch if you are interested. 

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


## Technology used

see above...

## Future enhancement

Given time/resources I wil add new features

* Create a homepage (would you like to contribute?)
* i18n/l10n
* Further documentation
* Further test coverage
* Improved elasticsearch index
* Improved messaging
* Addtional integration via google search and youtube
* Persist codepoints to a favorite list
* Generate/export font from list of codepoints
* Any community feedback...

# Local dev installation

If you already have mongo and elasticsearch running locally, skip ahead..

To quicly get a mongo/easticsearch environment up and running

```
./compose up
```

`compose.sh up` will install the following containers:

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

To cleanup after yourself when you are done:

```
./compose.sh down
```

# Starting the services

If you are not running mongo/elasticsearch on the following addresses, update the config in `.env`

* mongo on localhost:27017
* elasticsearch on localhost:9200

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
# this only needs to be done one time as the data in persisted to disk.
yarn seed
```

That's all for now... Thank you for wathing

