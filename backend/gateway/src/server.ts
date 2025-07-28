import Fastify from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const frontendUrl = process.env.FRONTEND_URL;
const authentificationUrl = process.env.AUTHENTIFICATION_URL;
const websocketUrl = process.env.WEBSOCKET_URL;
const port = Number(process.env.GATEWAY_PORT);

if (!databaseUrl || !frontendUrl || !authentificationUrl || !websocketUrl || !port) {
  throw new Error("Missing one or more required env variables: DATABASE_URL, FRONTEND_URL, AUTHENTIFICATION_URL, GATEWAY_PORT, WEBSOCKET_URL");
}

if (isNaN(port) || port <= 0 || port > 65535) {
  throw new Error("Invalid GATEWAY_PORT value");
}

// console logs
const server = Fastify({
  logger: true,
});

// if it's not from known api it will be rejected
server.register(fastifyCors, {
  origin: frontendUrl,
});

// redirections
server.register(fastifyHttpProxy, {
  upstream: databaseUrl,
  prefix: '/api/database',
  rewritePrefix: '/',
});

server.register(fastifyHttpProxy, {
  upstream: websocketUrl,
  prefix: '/api/websocket',
  rewritePrefix: '/',
});

server.register(fastifyHttpProxy, {
  upstream: frontendUrl,
  prefix: '/front',
  rewritePrefix: '/',
});

server.register(fastifyHttpProxy, {
  upstream: authentificationUrl,
  prefix: '/authentification',
  rewritePrefix: '/',
});

const start = async () => {
  try {
    const port = Number(process.env.GATEWAY_PORT);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Gateway listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();





