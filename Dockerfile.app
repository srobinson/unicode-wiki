ARG API_URL
ARG FONTS_URL
FROM node:9-alpine as BUILD
WORKDIR /build

ARG API_URL
ARG FONTS_URL

ENV REACT_APP_API_BASE_URL=${API_URL}
ENV REACT_APP_FONTS_URL=${FONTS_URL}

COPY package.json yarn.lock ./
COPY assets/www assets/www
COPY packages/uw-utils packages/uw-utils
COPY packages/uw-domain packages/uw-domain
COPY packages/uw-store packages/uw-store
COPY packages/uw-hoc packages/uw-hoc
COPY packages/uw-containers packages/uw-containers
COPY packages/uw-components packages/uw-components
COPY packages/uw-app packages/uw-app

COPY tsconfig.json jest.config.js tslint.json lerna.json ./

RUN yarn global add lerna && lerna bootstrap && yarn build:app

# FROM sdelrio/docker-minimal-nginx
FROM nginx:stable
WORKDIR /var/www
EXPOSE 80

ENV NODE_ENV=production

COPY --from=BUILD build/packages/uw-app/build .
COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
