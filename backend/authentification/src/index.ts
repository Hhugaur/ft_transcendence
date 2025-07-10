import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';

dotenv.config();

// console logs
const server = Fastify({
  logger: true,
});

// TODO
// server.register(jwt, {
//  secret: process.env.JWT_SECRET as string,
// });

// Manage data request
server.get('/api/auth', async (request, reply) => {
  try {
    reply.code(200).send({ message: 'Authentication request accepted!' });
  } catch (error) {
    server.log.error(error);
    reply.code(500).send({ error: 'Server error' });
  }
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





