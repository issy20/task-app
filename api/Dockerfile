FROM node:16-bullseye

WORKDIR /app

COPY ./package*.json ./

RUN npm cache verify
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]



# CMD ["npm", "run", "start:dev"]
