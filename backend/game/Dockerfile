FROM node:20-alpine3.22

WORKDIR /app

COPY package.json .

RUN apk add --no-cache g++ make python3 bash

RUN npm install socket.io --save
RUN npm install -g node-gyp
RUN npm install

COPY . .

EXPOSE 3005

CMD ["bash", "/app/src/entry.sh"]

