import { config } from './config.js'
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';

const server = Fastify({
    logger: true
});

await server.register(cookie);

await server.register(jwt, {
    secret: config.jwtPass,
    sign: {
        expiresIn: config.jwtExp || '1h'
    },
    cookie: { cookieName: 'token' }
});

server.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.code(401).send({ error: 'Unauthorized' });
    }
});

export default server;
