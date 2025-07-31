import { config } from './config.js';

export const sendDbLoginRequest = async (username, password) => {
    const send = await fetch(config.databaseUrl + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify({ username, password }));
        throw new Error(`Error API DB: ${error}`);
    }
}