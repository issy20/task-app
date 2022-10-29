#!/bin/bash

FROM --platform=linux/amd64 node:16-bullseye

WORKDIR /app

COPY ./package*.json ./
COPY ./prisma ./

RUN npm cache verify
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:dev"]