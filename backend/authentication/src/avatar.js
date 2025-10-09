import { config } from './config.js';

export const sendDbUpdateAvatarRequest = async (username, file) => {
    const send = await fetch(config.databaseUrl + '/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, file }),
    });

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify({ username, file }));
        throw new Error(`Error API DB: ${error}`);
    }
}

export const sendDbGetAvatarRequest = async (username) => {
    const send = await fetch(config.databaseUrl + `/avatar/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!send.ok) {
        const error = await send.text();
        throw new Error(`Error API DB: ${error}`);
    }

    return await send.json();
};