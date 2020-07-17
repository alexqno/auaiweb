FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN apk add --no-cache git

RUN yarn cache clean
RUN yarn --network-timeout 100000
RUN yarn global add react-scripts@3.4.1

COPY . ./

CMD ["yarn", "start"]
