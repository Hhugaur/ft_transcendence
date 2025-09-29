import server from './server.js';

export const getUserInfo = async (username, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username = $username', { $username: username });

        if (!user)
            return reply.code(400).send({ error: `${username} doesn't exist!`});
        // Ajouter la recuperation de l'avatar une fois le probleme resolu
        const userInfo = await db.get('SELECT username, status, ratio, win, lose FROM USERS WHERE username = $username', { $username: username });
        return reply.code(201).send({ message: `${username} informations send!`, username: username,
            status: userInfo.status, ratio: userInfo.ratio, win: userInfo.win, lose: userInfo.lose});
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: disconnect' });
    }
}