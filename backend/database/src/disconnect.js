import server from './server.js';

export const disconnectManager = async (username, db, reply) => {
    try {
        const user = await db.get('SELECT username, status FROM USERS WHERE username = $username', { $username: username });

        if (!user)
            return reply.code(400).send({ error: `${username} doesn't exist!`});
        if (user.status === 'Hors ligne')
            return reply.code(400).send({ error: `${username} already disconnected!`});

        await db.run('UPDATE USERS SET status = "Hors ligne" WHERE username = $username', { $username: username });
        return reply.code(201).send({ message: `${username} has been disconnected!`});
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: disconnect' });
    }
}