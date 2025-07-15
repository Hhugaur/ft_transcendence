up:
	docker-compose build
	docker-compose up -d

down:
	docker-compose down

dfclean:
	docker-compose down
	docker system prune -a

fclean:
	docker system prune -a

reload:
	docker restart front

re: dfclean up
	
.PHONY: up down fclean dfclean reload re

