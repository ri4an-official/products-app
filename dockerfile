FROM node:16-alpine

WORKDIR /app

COPY package* .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 4000

VOLUME [ "." ]

CMD [ "yarn", "start" ]
