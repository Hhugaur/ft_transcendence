import server from './server.js';

export const updateAvatar = async ({ username, file }, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username=?', username);
        if (!user) {
            return reply.code(404).send({ error: `${username} does not exist!` });
        }

        await db.run(
            'UPDATE USERS SET avatar = $file WHERE username = $username',
            { $username: username, $file: file }
        );

        return reply.code(200).send({ message: `${username}'s avatar updated to ${file}` });
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Database Error: updateAvatar' });
    }
}

export const getAvatar = async (username, db, reply) => {
    try {
        const user = await db.get('SELECT avatar FROM USERS WHERE username = ?', username);
        if (!user || !user.avatar) {
            return reply.code(404).send({ error: `User not found for ${username} or no avatar!` });
        }

        const avatarBase64 = user.avatar.toString('base64');
        return reply.code(200).send({ avatar: `data:image/png;base64,${avatarBase64}` });
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Database Error: getAvatar' });
    }
};