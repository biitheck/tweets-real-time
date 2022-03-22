export const environment = {
    production: true,
    apiServer: {
        url: '', prefix: 'api/v1',
    }, google: {
        clientId: '{{GOOGLE_CLIENT_ID}}',
    }, userKey: 'user_data',
    messages: {
        success: {
            title: 'Success', message: 'Action was completed successfully'
        },
        error: {
            title: 'Error...', message: 'Please try again',
        }
    },
};