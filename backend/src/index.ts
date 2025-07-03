import Fastify from 'fastify';

const app = Fastify();

app.get('/', async (req, reply) => {
  return { message: 'Hello from Fastify' };
});

app.listen({ port: 3000 }, () => {
  console.log('🚀 Server is running at http://localhost:3000');
});

