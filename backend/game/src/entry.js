import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const game = require('./game.node');

import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const server = Fastify({ logger: true });

server.post('/health', async (req, rep) => {
	return {
		service: "game",
        port: portNumber,
        status: "healthy",
        uptime: process.uptime(),
	}
});

server.post('/start', async (req, rep) => {
	const { player1, player2 } = request.body;
	if(!player1 || !player2) {
		console.log("unable to create match since players are not created");
		return reply.status(400).send({ error: 'Unable to create a match, requires both player' });
	}
	try {
		game.hello();
	} catch(e) {
		console.log(e);
	}
})
