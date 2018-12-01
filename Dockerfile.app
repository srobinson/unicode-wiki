FROM node:9-alpine as BUILD
WORKDIR /build

COPY package.json yarn.lock ./

COPY static/fonts ./static/fonts
COPY packages/uw-utils ./packages/uw-utils
COPY packages/uw-domain ./packages/uw-domain
COPY packages/uw-store ./packages/uw-store
COPY packages/uw-containers ./packages/uw-containers
COPY packages/uw-components ./packages/uw-components
COPY packages/uw-app ./packages/uw-app

COPY tsconfig.json jest.config.js tslint.json lerna.json ./

ENV REACT_APP_API_BASE_URL=https://api.unicode.wiki/api
ENV REACT_APP_FONTS_URL=/static/fonts

RUN yarn global add lerna && lerna bootstrap && yarn build:app

# FROM sdelrio/docker-minimal-nginx
FROM nginx:stable
WORKDIR /var/www
EXPOSE 80

ENV NODE_ENV=production

COPY --from=BUILD /build/packages/uw-app/build .
COPY --from=BUILD /build/static/fonts ./static/fonts
COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# kubectl patch deployment uw-app-web -p \
#   "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"
