import Fastify from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

// console logs
const server = Fastify({
  logger: true,
});

// if it's not from known api it will be rejected
server.register(fastifyCors, {
  origin: process.env.FRONTEND_URL,
});

// redirections
server.register(fastifyHttpProxy, {
  upstream: process.env.DATABASE_URL || 'http://database:3000',
  prefix: '/api/database',
  rewritePrefix: '/',
});

server.register(fastifyHttpProxy, {
  upstream: process.env.FRONTEND_URL || 'http://authentification:3002',
  prefix: '/authentification',
  rewritePrefix: '/',
});

server.register(fastifyHttpProxy, {
  upstream: process.env.AUTHENTIFICATION_URL || 'http://front:5000',
  prefix: '/front',
  rewritePrefix: '/',
});

const start = async () => {
  try {
    const port = Number(process.env.GATEWAY_PORT) || 3001;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Gateway listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();





