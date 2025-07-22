import server from './server.js';

export const addFriendManager = async ({ username, friend }, db, reply) => {
    try {
        const user = await db.get('SELECT username, id FROM USERS WHERE username=?', username);
        const friend_user = await db.get('SELECT username, id FROM USERS WHERE username=?', friend);

        if (!user || !friend_user)
            return reply.code(400).send({ error: `${username} or ${friend_user} doesn't exist!`});
        else {
            await db.run ('INSERT INTO FRIENDS (user_id, friend_id) VALUES ($user_id, $friend_id)',
                {$user_id: user.id, $friend_id: friend_user.id});
            return reply.code(201).send({ message: `${username} has been created!`});
        }
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: add friend' });
    }
}