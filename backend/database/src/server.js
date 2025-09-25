import Fastify from 'fastify';

const server = Fastify({
    logger: true,
    bodyLimit: 5 * 1024 * 1024
});

export default server;