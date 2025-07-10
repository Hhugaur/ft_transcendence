up:
	docker-compose build
	docker-compose up -d

down:
	docker-compose down

dfclean:
	docker-compose down
	docker system prune -af --volumes

fclean:
	docker system prune -af --volumes

reload:
	docker restart front

re:
	docker-compose down
	docker system prune -af --volumes
	docker-compose build
	docker-compose up -d
	
.PHONY: up down fclean dfclean reload re

