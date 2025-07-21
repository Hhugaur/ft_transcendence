import argon2 from 'argon2';

import server from './server.js';

export const loginManager = async ({ username, password }, db, reply) => {
    try {
        const user = await db.get('SELECT username, password FROM USERS WHERE username=?', username);

        if (!user)
            return reply.code(400).send({ error: "$username doesn't exist!"});

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid)
            return reply.code(401).send({ error: 'Invalid password' });
        return reply.code(201).send({ error: '$username has been logged!'});
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: login' });
    }
}