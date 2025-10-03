import { config } from './config.js'
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';

const server = Fastify({
    logger: true
});

await server.register(cookie);

await server.register(jwt, {
    secret: config.jwtPass, // ex: process.env.JWT_SECRET
    sign: {
        expiresIn: config.jwtExp || '1h'
    }
});

server.decorate("authenticate", async function (request, reply) {
    try {
        // vérifie le cookie d'abord (si tu settes dans cookie)
        if (request.cookies && request.cookies.token) {
            await request.jwtVerify({ cookie: { cookieName: 'token' } });
            return;
        }
        await request.jwtVerify(); // va throw si pas de token valide dans Authorization header
    } catch (err) {
        reply.code(401).send({ error: 'Unauthorized' });
    }
});

export default server;
