import { environment } from './../../environments/environment';

export const apiServer = environment.apiServer.url;
export const apiPrefix = environment.apiServer.prefix;
export const apiUrl = `${apiServer}`;

export const Targets = {
    SignIn: `${apiUrl}/account`,
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
