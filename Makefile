up:
	docker-compose build
	docker-compose up -d

down:
	docker-compose down

dfclean:
	docker-compose down
	docker system prune -af

fclean:
	docker system prune -af

reload:
	docker restart front

re: dfclean up
	
.PHONY: up down fclean dfclean reload re

