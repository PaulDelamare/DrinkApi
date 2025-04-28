
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm run create:drink:table && npm start"]
