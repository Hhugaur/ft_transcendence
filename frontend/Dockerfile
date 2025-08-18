FROM node:20-alpine3.22

WORKDIR /app

RUN npm install -D vite typescript tailwindcss postcss autoprefixer


COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

# mode dev localhost
# CMD ["npm", "run", "dev"]


# mode prod
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5000"]
