FROM node:20-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve
EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]
