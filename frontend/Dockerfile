FROM node:20-alpine3.22

WORKDIR /app

RUN npm install -D vite typescript tailwindcss postcss autoprefixer

COPY package.json .
RUN npm install

COPY . .

RUN npx tailwindcss -i ./style.css -o ./dist/output.css --config ./tailwind.config.ts

EXPOSE 5000

CMD ["npm", "run", "dev"]
