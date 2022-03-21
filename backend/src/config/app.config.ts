import * as dotenv from 'dotenv';
dotenv.config();

let path;
switch (process.env.NODE_ENV) {
    case 'prod':
        path = `${__dirname}/../../.env.prod`;
        break;
    default:
        path = `${__dirname}/../../.env.dev`;
}
dotenv.config({ path });

export const NODE_ENV = process.env.NODE_ENV;

export const IS_PROD = (process.env.NODE_ENV === 'prod');

export const SERVER = {
    PORT: parseInt(process.env.PORT as string),
};

export const GOOGLE = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
}

export const TWITTER = {
    API_URL: process.env.TWITTER_API_URL as string,
    API_KEY: process.env.TWITTER_API_KEY as string,
    API_SECRET: process.env.TWITTER_API_SECRET as string,
    BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN as string,
}


