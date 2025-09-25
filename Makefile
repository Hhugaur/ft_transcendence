# ===========================
#   VARIABLES
# ===========================
DB_DIR = database
DB_FILE = $(DB_DIR)/database.sqlite
HOST_IP := $(shell hostname -I | tr ' ' '\n' | grep '^10\.' | head -1)
HOST_IP := $(if $(HOST_IP),$(HOST_IP),$(shell hostname -I | cut -d' ' -f1))
HOST_IP := $(if $(HOST_IP),$(HOST_IP),localhost)

# Couleurs
GREEN = \033[0;32m
BLUE = \033[0;34m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

# ===========================
#   RÈGLES PRINCIPALES
# ===========================
all: up

up:
	@cat .env-template > .env
	@echo "HOST_IP=$(HOST_IP)" >> .env
	@echo "$(BLUE)[INFO]$(NC) 🚀 Création du dossier base de données et fichier SQLite"
	@mkdir -p $(DB_DIR) && touch $(DB_FILE) && chmod -R 777 $(DB_DIR)
	@echo "$(BLUE)[INFO]$(NC) 🛠️  Construction des containers..."
	@docker compose build
	@echo "$(GREEN)[OK]$(NC) ✅ Containers construits avec succès !"
	@echo "$(BLUE)[INFO]$(NC) 🔥 Lancement des services en arrière-plan..."
	@docker compose up -d
	@echo "$(GREEN)[SUCCESS]$(NC) ✅ Application lancée !"

down:
	@echo "$(YELLOW)[STOP]$(NC) 🔻 Arrêt des containers..."
	@docker compose down
	@echo "$(GREEN)[OK]$(NC) ✅ Containers arrêtés."

re: dfclean up

ws:
	docker restart websocket

re: dfclean up
	
dfclean: down
	@echo "$(RED)[CLEAN]$(NC) 🔍 Arrêt containers + prune volumes + suppression DB"
	@docker system prune -af --volumes
	@rm -rf $(DB_DIR)
	@echo "$(GREEN)[OK]$(NC) ✅ Nettoyage effectué."
	@rm -rf backend/game/src/game.node
	@rm -fr .env



# ===========================
#   HELP
# ===========================
help:
	@echo ""
	@echo "$(YELLOW)=== Commandes disponibles ===$(NC)"
	@echo "$(BLUE)make$(NC)            → Lance la règle 'all' (démarrage complet)"
	@echo "$(BLUE)make up$(NC)         → Build + Run containers"
	@echo "$(BLUE)make down$(NC)       → Stop containers"
	@echo "$(BLUE)make reload$(NC)     → Restart front"
	@echo "$(BLUE)make fclean$(NC)     → Full clean (containers, volumes, DB)"
	@echo "$(BLUE)make dfclean$(NC)    → Down + prune volumes + DB"
	@echo "$(BLUE)make re$(NC)         → Full clean + restart"
	@echo "$(BLUE)make help$(NC)       → Affiche cette aide"
	@echo ""

.PHONY: all up down fclean dfclean reload re help ws
