import dotenv from 'dotenv';

dotenv.config();

export const config = {
    backendUrl: process.env.BACKEND_URL,
    databaseUrl: process.env.DATABASE_URL,
    frontendUrl: process.env.FRONTEND_URL,
    authenticationUrl: process.env.AUTHENTICATION_URL,
    port: Number(process.env.AUTHENTICATION_PORT),
    safeUsernameSQLInjection: /^(?!.*(--|\/\*|;|'|"|#|=)).{1,20}$/,
    safePasswordSQLInjection: /^(?!.*(--|\/\*|;|'|"|#|=)).{12,32}$/,
    jwtPass: process.env.JWT_SECRET,
    jwtExp: process.env.JWT_EXPIRES_IN,
};

if (!config.databaseUrl || !config.frontendUrl || !config.authenticationUrl)
    throw new Error("Missing one or more required env variables: DATABASE_URL, FRONTEND_URL, AUTHENTICATION_URL, GATEWAY_PORT");

if (isNaN(config.port) || config.port <= 0 || config.port > 65535)
    throw new Error("Invalid GATEWAY_PORT value");

if (!config.jwtPass || !config.jwtExp)
    throw new Error("JWT information(s) are missing!");