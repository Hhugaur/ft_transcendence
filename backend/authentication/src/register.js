import { config } from './config.js';

export const sendDbRegisterRequest = async (username, hashedPassword) => {
    const send = await fetch(config.databaseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: hashedPassword }),
    });

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify({ username, password: hashedPassword }));
        throw new Error(`Error API DB: ${error}`);
    }
}