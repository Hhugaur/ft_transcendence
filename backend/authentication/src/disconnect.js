import { config } from './config.js';

export const sendDbDisconnectRequest = async (username) => {
    const send = await fetch(config.databaseUrl + '/disconnect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify(username));
        throw new Error(`Error API DB: ${error}`);
    }
}