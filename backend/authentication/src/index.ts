import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const frontendUrl = process.env.FRONTEND_URL;
const authenticationUrl = process.env.AUTHENTICATION_URL;
const port = Number(process.env.GATEWAY_PORT);

if (!databaseUrl || !frontendUrl || !authenticationUrl || !port) {
  throw new Error("Missing one or more required env variables: DATABASE_URL, FRONTEND_URL, AUTHENTICATION_URL, GATEWAY_PORT");
}

if (isNaN(port) || port <= 0 || port > 65535) {
  throw new Error("Invalid GATEWAY_PORT value");
}

// console logs
const server = Fastify({
  logger: true,
});

// TODO
// server.register(jwt, {
//  secret: process.env.JWT_SECRET as string,
// });

// Manage data request
server.get('/authentication', async (request, reply) => {
  try {
    reply.code(200).send({ message: 'Authentication request accepted!' });
  } catch (error) {
    server.log.error(error);
    reply.code(500).send({ error: 'Server error' });
  }
});


const start = async () => {
  try {
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Gateway listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();





