ARG ANALYTICS_ID
ARG FONTS_URL
ARG GRAPHQL_URL

FROM gcr.io/unicode-wiki/uw-base AS BUILD
WORKDIR /build

ARG ANALYTICS_ID
ARG FONTS_URL
ARG GRAPHQL_URL

ENV REACT_APP_GRAPHQL_URL=${GRAPHQL_URL}
ENV REACT_APP_FONTS_URL=${FONTS_URL}
ENV REACT_APP_GOOGLE_ANALYTICS_ID=${ANALYTICS_ID}

COPY package.json \
     yarn.lock \
     tsconfig.json \
     jest.config.js \
     tslint.json \
     lerna.json ./

COPY --from=gcr.io/unicode-wiki/uw-packages /tmp/node_modules ./node_modules
COPY --from=gcr.io/unicode-wiki/uw-assets /tmp/assets/www ./assets/www

COPY packages/uw-utils packages/uw-utils
COPY packages/uw-domain packages/uw-domain
COPY packages/uw-components packages/uw-components
COPY packages/uw-hoc packages/uw-hoc
COPY packages/uw-containers packages/uw-containers
COPY packages/uw-api-graph packages/uw-api-graph
COPY packages/uw-store packages/uw-store
COPY packages/uw-app packages/uw-app
COPY --from=gcr.io/unicode-wiki/uw-assets /tmp/assets/www ./assets/www

RUN yarn prepare && yarn build:app

##

# FROM sdelrio/docker-minimal-nginx
FROM nginx:stable
WORKDIR /var/www
EXPOSE 80

ENV NODE_ENV=production

COPY --from=BUILD build/packages/uw-app/build .
COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
