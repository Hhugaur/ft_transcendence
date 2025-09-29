import cors from '@fastify/cors';

import server from './server.js';
import multipart from '@fastify/multipart';
import { config } from './config.js';
import { encryptPassword } from './utils.js';
import { sendDbRegisterRequest } from './register.js';
import { sendDbLoginRequest } from './login.js';
import { sendDbDisconnectRequest } from './disconnect.js';
import { sendDbGetUserInfoRequest } from './getter.js';
import { sendDbAddFriendRequest, sendDbDeleteFriendRequest } from "./friends.js";
import { sendDbUpdateAvatarRequest, sendDbGetAvatarRequest } from './avatar.js';


// TODO but not here
// server.register(jwt, {
//  secret: process.env.JWT_SECRET as string,
// });

server.register(multipart, {
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

await server.register(cors, {
    origin: '*', // a modif mais pour l'instant test
    methods: ['GET', 'POST']
});

// Manage data request
server.post('/register', async (request, reply) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            console.log('Body received by /register:', request.body);
            return reply.code(400).send({ error: `Invalid argument(s)!: ${username}, ${password}` });
        }
        if (!config.safeUsernameSQLInjection.test(username) || !config.safePasswordSQLInjection.test(password)) {
            return reply.code(400).send({ error: 'Use of prohibited character(s) or too few characters!' })
        }
        const hashedPassword = await encryptPassword(password);

        await sendDbRegisterRequest(username, hashedPassword);
        reply.code(200).send({ message: `The user ${username} has been registred!` });
    } catch (error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.post('/login', async (request, reply) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            console.log('Body received by /login:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        if (!config.safeUsernameSQLInjection.test(username) || !config.safePasswordSQLInjection.test(password)) {
            return reply.code(400).send({ error: 'Use of prohibited character(s)!' })
        }

        await sendDbLoginRequest(username, password);
        reply.code(200).send({ message: `The user ${username} is connected!` });
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.post('/disconnect', async (request, reply) => {
    try {
        const { username } = request.body;
        if (!username) {
            console.log('Body received by /disconnect:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        if (!config.safeUsernameSQLInjection.test(username)) {
            return reply.code(400).send({ error: 'Use of prohibited character(s)!' })
        }

        await sendDbDisconnectRequest(username);
        reply.code(200).send({ message: `The user ${username} has been disconnected!` });
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.post('/friends/add', async (request, reply) => {
    try {
        const { username, friend } = request.body;
        if (!username || !friend) {
            console.log('Body received by /friends/add:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        if (!config.safeUsernameSQLInjection.test(username) || !config.safeUsernameSQLInjection.test(friend)) {
            return reply.code(400).send({ error: 'Use of prohibited character(s)!' })
        }

        await sendDbAddFriendRequest(username, friend);
        reply.code(200).send({ message: `${username} try to add ${friend}: Success, ${friend} has been add his friend list!` });
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.post('/friends/delete', async (request, reply) => {
    try {
        const { username, friend } = request.body;
        if (!username || !friend) {
            console.log('Body received by /friends/delete:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        if (!config.safeUsernameSQLInjection.test(username) || !config.safeUsernameSQLInjection.test(friend)) {
            return reply.code(400).send({ error: 'Use of prohibited character(s)!' })
        }

        await sendDbDeleteFriendRequest(username, friend);
        reply.code(200).send({ message: `${username} try to delete ${friend}: Success, ${friend} has been deleted from his friend list!` });
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.patch('/upload', async (request, reply) => {
    try {
        const filePart = await request.file();
        if (!filePart) {
            return reply.code(400).send({ error: "No file uploaded" });
        }

        // Lis le contenu du fichier en mémoire
        const chunks = [];
        for await (const chunk of filePart.file) {
            chunks.push(chunk);
        }
        const fileBuffer = Buffer.concat(chunks);

        // Récupère le champ "username" depuis le formulaire
        const username = filePart.fields.username?.value;
        if (!username) {
            return reply.code(400).send({ error: "Missing username" });
        }

        const fileBase64 = fileBuffer.toString('base64');
        await sendDbUpdateAvatarRequest(username, fileBase64);

        return reply.code(200).send({
            message: `${username} uploaded avatar successfully!`
        });
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.post('/friends/delete', async (request, reply) => {
    try {
        const { username } = request.params;
        if (!username) {
            console.log('Body received by /avatar:', request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        if (!config.safeUsernameSQLInjection.test(username)) {
            return reply.code(400).send({ error: 'Use of prohibited character(s)!' })
        }

        try {
            const data = await sendDbGetAvatarRequest(username);
        } catch(error) {
            reply.code(404).send({ avatar: null, message: "No avatar found" }); // can be better
        }
        const avatarUrl = `${config.backendUrl}/uploads/avatars/${data.avatar}`;
        reply.code(200).send({ avatarUrl });
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

server.get('/:username', async (request, reply) => {
    try {
        const { username } = request.params;
        if (!username) {
            console.log(`Body received by /username:`, request.body);
            return reply.code(400).send({ error: 'Invalid argument(s)!' });
        }
        if (!config.safeUsernameSQLInjection.test(username)) {
            return reply.code(400).send({ error: 'Use of prohibited character(s)!' })
        }

        await sendDbGetUserInfoRequest(username);
        reply.code(200).send('Informations received successfully!');
    } catch(error) {
        server.log.error(error);
        server.log.error(error.message);
        server.log.error(error.stack);
        reply.code(500).send({ error: 'Authentication server error' });
    }
});

const start = async () => {
    try {
        await server.listen({ port: config.port, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

