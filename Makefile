up:
	mkdir database && touch database/database.sqlite && chmod -R 777 database/database.sqlite
	docker-compose build
	docker-compose up -d

down:
	docker-compose down

dfclean:
	docker-compose down
	docker system prune -af --volumes
	rm -rf database

fclean:
	docker system prune -af --volumes
	rm -rf database

reload:
	docker restart front

re:
	docker-compose down
	docker system prune -af --volumes
	rm -rf database
	docker-compose build
	docker-compose up -d
	
.PHONY: up down fclean dfclean reload re

