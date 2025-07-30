import cors from '@fastify/cors';

import server from './server.js';
import { config } from './config.js';

const start = async () => {
    try {
        await server.listen({ port: config.port, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

