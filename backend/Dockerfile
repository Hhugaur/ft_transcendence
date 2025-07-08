FROM node:current-alpine3.21

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD ["node", "dist/index.js"]

