FROM --platform=linux/arm64 node:16-bullseye

WORKDIR /app

COPY ./package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# FROM node:16-bullseye

# WORKDIR /app

# COPY ./package*.json ./

# RUN npm install 

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]
