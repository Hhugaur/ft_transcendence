import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initDatabase() {
    return open({
        filename: './database/database.sqlite',
        driver: sqlite3.Database
    });
}

async function main() {
    try {
        const database = await initDatabase();
        const sql = fs.readFileSync('./database.sql').toString();
        await database.exec(sql);

        console.log("Database initialized!");
    } catch (err) {
        console.error("Failed to initialize the database:", err.message);
    }
}

async function listTables() {
    const db = await open({
        filename: './database/database.sqlite',
        driver: sqlite3.Database
  });

  const tables = await db.all(`
    SELECT name FROM sqlite_master
    WHERE type='table' AND name NOT LIKE 'sqlite_%';
  `);

  console.log("Tables in the database:");
  tables.forEach(table => console.log(table.name));
}

main();
listTables();
