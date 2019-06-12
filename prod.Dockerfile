FROM node:10-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE ${APP_PORT}

CMD [ "npm", "run", "start" ]