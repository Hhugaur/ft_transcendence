import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from '@fastify/cors';

import server from './server.js';
import { config } from './config.js';
import { loginManager } from './login.js';
import { registerManager } from './register.js';
import { disconnectManager } from './disconnect.js';
import { addFriendManager } from './friends.js';

async function initDatabase() {
    return open({
        filename: './database/database.sqlite',
        driver: sqlite3.Database
    });
}

await server.register(cors, {
    origin: '*', // a modif mais pour l'instant test
    methods: ['GET', 'POST']
});

async function main() {
    let database;
    try {
        database = await initDatabase();
        const sql = fs.readFileSync(new URL('../database.sql', import.meta.url)).toString();
        await database.exec(sql);

        console.log("Database initialized!");
    } catch (err) {
        console.error("Failed to initialize the database:", err.message);
    }

    try {
        server.post('/database/register', async (request, reply) => {
            const { username, password } = request.body;
            await registerManager({ username, password }, database, reply);
        })
        server.post('/database/login', async (request, reply) => {
            const { username, password } = request.body;
            await loginManager({ username, password }, database, reply);
        })
        server.post('/database/disconnect', async (request, reply) => {
            const { username } = request.body;
            await disconnectManager(username, database, reply);
        })
        server.post('/database/friends/add', async (request, reply) => {
            const { username, friend } = request.body;
            await addFriendManager({ username, friend }, database, reply);
        })
    } catch (err) {
        console.error("Error:", err.message);
    }

    try {
        await server.listen({ port: config.port, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

main();
