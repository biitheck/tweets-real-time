import { environment } from './../../environments/environment';

const apiServer = environment.apiServer.url;
const apiPrefix = environment.apiServer.prefix;
const apiUrl = `${apiServer}/${apiPrefix}`;

export const Targets = {
    Socket: `${apiUrl}/socket-tweet`,
};

export const messages = {
    success: {
        title: environment.messages.success.title,
        message: environment.messages.success.message
    },
    error: {
        title: environment.messages.error.title,
        message: environment.messages.error.message
    }
};
