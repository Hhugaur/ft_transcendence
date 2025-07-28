HOST_IP := $(shell hostname -I | tr ' ' '\n' | grep '^10\.' | head -1)
HOST_IP := $(if $(HOST_IP),$(HOST_IP),$(shell hostname -I | cut -d' ' -f1))
HOST_IP := $(if $(HOST_IP),$(HOST_IP),localhost)

up:
	cat .env-template > .env
	echo "HOST_IP=$(HOST_IP)" >> .env
	docker-compose up -d --build

down:
	docker-compose down
	rm -fr .env

dfclean: down
	docker system prune -af

reload:
	docker restart front

ws:
	docker restart websocket

re: dfclean up
	
.PHONY: up down fclean dfclean reload re websocket

