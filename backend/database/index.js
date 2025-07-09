const sqlite3 = require('sqlite3').verbose();
const http = require('http');

// database connexion (in /app/data to persist)
const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) {
    console.error("❌ Erreur lors de l'ouverture de la base :", err.message);
  } else {
    console.log("✅ Base SQLite connectée.");
  }
});

// Create db
//db.run(`CREATE TABLE IF NOT EXISTS users (
//  id INTEGER PRIMARY KEY AUTOINCREMENT,
//  name TEXT
//)`);

http.createServer((req, res) => {
  res.end("Database service running");
}).listen(3000, () => {
  console.log("✅ Database service listening on port 3000");
});

