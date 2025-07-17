CREATE TABLE IF NOT EXISTS USERS (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username VARCHAR(45) UNIQUE NOT NULL,
	password VARCHAR(128),
	avatar BLOB,
	ratio VARCHAR(5),
	win INTEGER DEFAULT 0,
	lose INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS GAMES (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	red_player_id INTEGER,
	blue_player_id INTEGER,
	FOREIGN KEY (red_player_id) REFERENCES USERS(id),
	FOREIGN KEY (blue_player_id) REFERENCES USERS(id)
);

CREATE TABLE IF NOT EXISTS FRIENDS (
	user_id INTEGER,
	friend_id INTEGER,
	status TEXT CHECK(status IN ('disconnected', 'connected', 'absent')) NOT NULL DEFAULT 'disconnected',
	PRIMARY KEY (user_id, friend_id),
	FOREIGN KEY (user_id) REFERENCES USERS(id),
	FOREIGN KEY (friend_id) REFERENCES USERS(id)
);

CREATE TABLE IF NOT EXISTS GAMES_HISTORY (
	game_id INTEGER PRIMARY KEY,
	red_player_id INTEGER,
	blue_player_id INTEGER,
	winner_id INTEGER,
	score INTEGER,
	touch_red INTEGER,
	touch_blue INTEGER,
	ball_max_speed REAL NOT NULL,
	date DATETIME NOT NULL,
	FOREIGN KEY (game_id) REFERENCES GAMES(id),
	FOREIGN KEY (winner_id) REFERENCES USERS(id),
	FOREIGN KEY (red_player_id) REFERENCES USERS(id),
	FOREIGN KEY (blue_player_id) REFERENCES USERS(id)
);

DROP VIEW IF EXISTS USER_STATS;

CREATE VIEW USER_STATS AS
SELECT
	id,
	username,
	win,
	lose,
	win || '/' || CASE WHEN (win + lose) = 0 THEN 1 ELSE (win + lose) END AS ratio
FROM USERS;
