import argon2 from 'argon2';

import server from './server.js';

export const loginManager = async ({ username, password }, db, reply) => {
    try {
        const user = await db.get('SELECT username, password, status FROM USERS WHERE username=?', username);

        if (!user)
            return reply.code(400).send({ error: "$username doesn't exist!"});
        if (user.status !== 'disconnected')
            return reply.code(400).send({ error: "$username already logged!"});

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid)
            return reply.code(401).send({ error: 'Invalid password' });
        await db.run('UPDATE USERS SET status = "connected" WHERE username = $username',
            { $username: username });
        return reply.code(201).send({ message: '$username has been logged!'});
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: login' });
    }
}