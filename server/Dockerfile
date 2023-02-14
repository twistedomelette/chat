FROM node:alpine

WORKDIR usr/src/server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]