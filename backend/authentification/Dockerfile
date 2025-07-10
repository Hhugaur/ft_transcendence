FROM node:20-alpine3.22

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["node", "dist/index.js"]

