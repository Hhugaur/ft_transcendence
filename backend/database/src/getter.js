import server from './server.js';

export const getUserInfo = async (username, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username = $username', { $username: username });

        if (!user)
            return reply.code(400).send({ error: `${username} doesn't exist!`});
        // Ajouter la recuperation de l'avatar une fois le probleme resolu
        const userInfo = await db.get('SELECT username, status, ratio, win, lose FROM USERS WHERE username = $username', { $username: username });
        return reply.code(201).send({ message: `${username} informations send!`, userInfo });
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: disconnect' });
    }
}

export const getUserFriendsInfo = async (username, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username = $username', { $username: username });

        if (!user)
            return reply.code(400).send({ error: `${username} doesn't exist!`});

        const userFriendsInfo = await db.get(`SELECT u.id, u.username, u.status, u.avatar FROM FRIENDS f JOIN USERS u ON f.friend_id = u.id WHERE f.user_id = ${username}`, { $username: username });
        return reply.code(201).send({ message: `${username} informations send!`, userFriendsInfo });
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: disconnect' });
    }
}

export const getUserBlockedInfo = async (username, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username = $username', { $username: username });

        if (!user)
            return reply.code(400).send({ error: `${username} doesn't exist!`});

        const userBlockedInfo = await db.get(`SELECT u.id, u.username, u.status FROM BLOCKED b JOIN USERS u ON b.blocked_id = u.id WHERE b.user_id = ${username}`, { $username: username });
        return reply.code(201).send({ message: `${username} informations send!`, userBlockedInfo });
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: disconnect' });
    }
}

export const getUserHistoryInfo = async (username, db, reply) => {
    try {
        const user = await db.get('SELECT username FROM USERS WHERE username = $username', { $username: username });

        if (!user)
            return reply.code(400).send({ error: `${username} doesn't exist!`});

        const userHistoryInfo = await db.get(`SELECT g.id AS game_id, u1.username AS red_player, u2.username AS blue_player,
                                       uw.username AS winner, g.score, g.touch_red, g.touch_blue,
                                       g.ball_max_speed, g.date
                                       FROM GAMES_HISTORY g
                                       JOIN USERS u1 ON g.red_player_id = u1.id
                                       JOIN USERS u2 ON g.blue_player_id = u2.id
                                       LEFT JOIN USERS uw ON g.winner_id = uw.id
                                       WHERE g.red_player_id = ${username} OR g.blue_player_id = ${username}
                                       ORDER BY g.date DESC LIMIT 10`, { $username: username });
        return reply.code(201).send({ message: `${username} informations send!`, userHistoryInfo });
    } catch (err) {
        server.log.error(err);
        return reply.code(500).send({ error: 'Internal Database Server Error: disconnect' });
    }
}