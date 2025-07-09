up:
	docker-compose build
	docker-compose up -d

down:
	docker-compose down

fclean:
	docker system prune -af --volumes
	rm -rf db
	
.PHONY: up down fclean

