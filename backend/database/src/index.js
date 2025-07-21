import fs from 'fs';
import Fastify from 'fastify';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.DATABASE_PORT);

if (isNaN(port) || port <= 0 || port > 65535) { // Maybe restrict under 1024 ?? because need root
    throw new Error("Invalid GATEWAY_PORT value");
}

const server = Fastify();

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

const registerManager = async ({ username, password }, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username=?', username);

        if (user)
            return reply.code(400).send({ error: '$username already exist!'});
        else {
            await db.run ('INSERT INTO USERS (username, password) VALUES ($username, $password)',
                {$username: username, $password: password});
            return reply.code(201).send({ error: '$username has been created!'});
        }
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error' });
    }
}

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
    } catch (err) {
        console.error("Error:", err.message);
    }

    try {
        await server.listen({ port, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

main();
