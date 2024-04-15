FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

EXPOSE 8080

CMD ["sh", "./start.sh"]