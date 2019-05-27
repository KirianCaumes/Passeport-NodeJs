FROM node:11.15-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "-L", "./index.js"]