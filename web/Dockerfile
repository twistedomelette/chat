FROM node:12

WORKDIR usr/src/web

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run start"]