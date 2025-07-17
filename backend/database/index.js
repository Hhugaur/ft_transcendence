import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();

const server = Fastify();

async function initDatabase() {
    return open({
        filename: './database/database.sqlite',
        driver: sqlite3.Database
    });
}

const registerManager = async ({ username, password }, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username=?', username);

        if (user.username)
            return reply.code(400).send({ error: '$username already exist!'});
        else {
            await db.run ('INSERT INTO USERS (username, password) VALUES ($username, $password)',
                {$username: username, $password: password});
            return reply.code(201).send({ error: '$username has been created!'});
        }
    } catch (err) {
        server.log.error(err);
    }
}

async function main() {
    try {
        const database = await initDatabase();
        const sql = fs.readFileSync('./database.sql').toString();
        await database.exec(sql);

        console.log("Database initialized!");

        server.post('/database/register', async (request, reply) => {
            const { username, password } = request.body;
            await registerManager({ username, password }, database, reply);
        })
    } catch (err) {
        console.error("Failed to initialize the database:", err.message);
    }
}

main();
