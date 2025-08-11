FROM alpine:3.22

RUN apk add --no-cache nginx openssl

RUN mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 \
    -subj "/C=FR/ST=Nouvelle-Aquitaine/L=Angouleme/O=42/OU=42/CN=transcendence.42.fr/UID=rgobet" \
    -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/transcendence.key \
    -out /etc/nginx/ssl/transcendence.crt

COPY conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 6969 4269

CMD ["nginx", "-g", "daemon off;"]
