# ===========================
#   VARIABLES
# ===========================
DB_DIR = database
DB_FILE = $(DB_DIR)/database.sqlite

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
	@echo "$(BLUE)[INFO]$(NC) 🚀 Création du dossier base de données et fichier SQLite"
	@mkdir -p $(DB_DIR) && touch $(DB_FILE) && chmod -R 777 $(DB_DIR)
	@echo "$(BLUE)[INFO]$(NC) 🛠️  Construction des containers..."
	@docker-compose build
	@echo "$(GREEN)[OK]$(NC) ✅ Containers construits avec succès !"
	@echo "$(BLUE)[INFO]$(NC) 🔥 Lancement des services en arrière-plan..."
	@docker-compose up -d
	@echo "$(GREEN)[SUCCESS]$(NC) ✅ Application lancée !"

down:
	@echo "$(YELLOW)[STOP]$(NC) 🔻 Arrêt des containers..."
	@docker-compose down
	@echo "$(GREEN)[OK]$(NC) ✅ Containers arrêtés."

re: dfclean up

reload:
	@echo "$(BLUE)[INFO]$(NC) 🔄 Redémarrage du container front..."
	@docker restart front
	@echo "$(GREEN)[OK]$(NC) ✅ Front redémarré."

# ===========================
#   CLEAN COMMANDS
# ===========================
fclean:
	@echo "$(RED)[CLEAN]$(NC) 🗑 Suppression de TOUT (containers, volumes, DB)..."
	@docker system prune -af --volumes
	@rm -rf $(DB_DIR)
	@echo "$(GREEN)[OK]$(NC) ✅ Nettoyage complet terminé."

dfclean:
	@echo "$(RED)[CLEAN]$(NC) 🔍 Arrêt containers + prune volumes + suppression DB"
	@docker-compose down
	@docker system prune -af --volumes
	@rm -rf $(DB_DIR)
	@echo "$(GREEN)[OK]$(NC) ✅ Nettoyage effectué."

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

.PHONY: all up down fclean dfclean reload re help
