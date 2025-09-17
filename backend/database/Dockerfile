FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json .

RUN apt-get update && apt-get install -y python3 make g++ sqlite3

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
