FROM node:11.15-stretch

WORKDIR /app

# RUN apk add --no-cache --virtual .gyp python make g++ && apk del .gyp

COPY package.json /app/package.json

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "-L", "./index.js"]