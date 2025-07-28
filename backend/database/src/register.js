import server from './server.js';

export const registerManager = async ({ username, password }, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username=?', username);

        if (user)
            return reply.code(400).send({ error: `${username} already exist!`});
        else {
            await db.run ('INSERT INTO USERS (username, password) VALUES ($username, $password)',
                {$username: username, $password: password});
            return reply.code(201).send({ message: `${username} has been created!`});
        }
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: register' });
    }
}