import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const game = require('./game.node');

import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const portNumber = process.env.GAME_PORT;

const server = Fastify({ logger: true });

server.get('/health', async (req, rep) => {
	return {
		service: "game",
        port: portNumber,
        status: "healthy",
        uptime: process.uptime()
	}
});

server.post('/start', async (req, rep) => {
	const { player1, player2 } = request.body;
	if(!player1 || !player2) {
		console.log("unable to create match since players are not created");
		return reply.status(400).send({ error: "Unable to create a match, requires both player" });
	}
	try {
		game.startGame(player1, player2);
	} catch(e) {
		console.error(e);
		return reply.status(400).send({ error: e });
	}
})

try {
	server.listen({
		port: portNumber,
		host: '0.0.0.0'
	});
    console.log(`websocket is listening on port ${portNumber}`);
} catch(e) {
	console.error(e);
}
