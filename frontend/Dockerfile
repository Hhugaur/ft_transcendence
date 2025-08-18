FROM node:20-alpine3.22

WORKDIR /app

RUN npm install -D vite typescript tailwindcss postcss autoprefixer

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "dev"]
