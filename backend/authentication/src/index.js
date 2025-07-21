import cors from '@fastify/cors';
import Fastify from 'fastify';
import dotenv from 'dotenv';
import argon2 from 'argon2';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const frontendUrl = process.env.FRONTEND_URL;
const authenticationUrl = process.env.AUTHENTICATION_URL;
const port = Number(process.env.AUTHENTICATION_PORT);

if (!databaseUrl || !frontendUrl || !authenticationUrl) {
    throw new Error("Missing one or more required env variables: DATABASE_URL, FRONTEND_URL, AUTHENTICATION_URL, GATEWAY_PORT");
}

if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error("Invalid GATEWAY_PORT value");
}
// console logs
const server = Fastify({
    logger: true,
});

// TODO but not here
// server.register(jwt, {
//  secret: process.env.JWT_SECRET as string,
// });

await server.register(cors, {
    origin: '*', // a modif mais pour l'instant test
    methods: ['GET', 'POST']
});

const sendDbRegisterRequest = async (username, hashedPassword) => {
    const send = await fetch(databaseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: hashedPassword }),
    });

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify({ username, password: hashedPassword }));
        throw new Error(`Error API DB: ${error}`);
    }

    return await send.json();
}

// Manage data request
server.post('/authentication/register', async (request, reply) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            console.log('Body reçu par /authentication/register:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64 MB
            timeCost: 3,
            parallelism: 1
        });

        const send = await sendDbRegisterRequest(username, hashedPassword);
        reply.code(200).send({ message: `The user ${username} has been registred!` });
    } catch (error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

const start = async () => {
    try {
        await server.listen({ port, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

