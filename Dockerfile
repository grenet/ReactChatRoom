FROM node:16.17.0-alpine

RUN apk update && \
  apk upgrade && \
  apk add --no-cache vim yarn bash

COPY ./ /app/
WORKDIR /app

RUN yarn install
