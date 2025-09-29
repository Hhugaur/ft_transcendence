import { config } from './config.js';

export const sendDbGetUserInfoRequest = async (username) => {
    const send = await fetch(config.databaseUrl + `/${username}`);

    if (!send.ok) {
        const error = await send.text();
        console.log('Sending to DB:', JSON.stringify({ username }));
        throw new Error(`Error API DB: ${error}`);
    }
}