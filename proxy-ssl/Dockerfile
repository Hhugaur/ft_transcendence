FROM node:20 AS build
WORKDIR /app
COPY frontend/package*.json .
RUN npm install
COPY frontend/ .
RUN npm run build

FROM alpine:3.22

RUN apk add --no-cache nginx openssl

RUN mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 \
    -subj "/C=FR/ST=Nouvelle-Aquitaine/L=Angouleme/O=42/OU=42/CN=transcendence.42.fr/UID=rgobet" \
    -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/transcendence.key \
    -out /etc/nginx/ssl/transcendence.crt

COPY proxy-ssl/conf/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /app/dist

EXPOSE 6969 4269

CMD ["nginx", "-g", "daemon off;"]
