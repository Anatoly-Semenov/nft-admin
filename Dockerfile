FROM node:12-alpine

RUN apk add git

WORKDIR /web

ADD . .
RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]
