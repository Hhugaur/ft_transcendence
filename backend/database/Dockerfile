FROM node:20-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++ sqlite
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
