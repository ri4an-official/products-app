FROM node:16-alpine

WORKDIR /app

COPY package* .
COPY yarn.lock .

RUN yarn

COPY . .

VOLUME [ "/server/data" ]

CMD [ "yarn", "start" ]
