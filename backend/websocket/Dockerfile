FROM node:20-alpine3.22

WORKDIR /app

COPY package.json .

RUN npm install socket.io --save
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "src/entry.js"]

