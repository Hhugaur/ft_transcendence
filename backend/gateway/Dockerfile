FROM node:20-alpine3.22

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]

