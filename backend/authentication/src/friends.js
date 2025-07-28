import { config } from './config.js';

export const sendDbAddFriendRequest = async (username, friend) => {
    const send = await fetch(config.databaseUrl + '/friends/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, friend }),
    });

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify({ username, friend }));
        throw new Error(`Error API DB: ${error}`);
    }
}

export const sendDbDeleteFriendRequest = async (username, friend) => {
    const send = await fetch(config.databaseUrl + '/friends/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, friend }),
    });

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify({ username, friend }));
        throw new Error(`Error API DB: ${error}`);
    }
}