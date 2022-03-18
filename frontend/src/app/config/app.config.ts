import { environment } from './../../environments/environment';

const apiServer = environment.apiServer.url;
const apiPrefix = environment.apiServer.prefix;
const apiUrl = `${apiServer}/${apiPrefix}`;

export const Targets = {
    SignIn: `${apiUrl}/account`,
    Socket: `${apiUrl}/socket-tweet`,
};

export const google = {
    clientId: environment.google.clientId,
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
