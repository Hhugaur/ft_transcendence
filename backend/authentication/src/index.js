import cors from '@fastify/cors';

import server from './server.js';
import { config } from './config.js';
import { encryptPassword } from './utils.js';
import { sendDbRegisterRequest } from './register.js';
import { sendDbLoginRequest } from './login.js';


// TODO but not here
// server.register(jwt, {
//  secret: process.env.JWT_SECRET as string,
// });

await server.register(cors, {
    origin: '*', // a modif mais pour l'instant test
    methods: ['GET', 'POST']
});

// Manage data request
server.post('/authentication/register', async (request, reply) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            console.log('Body received by /authentication/register:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        const hashedPassword = await encryptPassword(password);

        await sendDbRegisterRequest(username, hashedPassword);
        reply.code(200).send({ message: `The user ${username} has been registred!` });
    } catch (error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.post('/authentication/login', async (request, reply) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            console.log('Body received by /authentication/login:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }

        await sendDbLoginRequest(username, password);
        reply.code(200).send({ message: `The user ${username} is connected!` });
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

const start = async () => {
    try {
        await server.listen({ port: config.port, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

