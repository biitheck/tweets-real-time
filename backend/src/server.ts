import App from './app';
import * as _CONFIG from './config/app.config';

const app = new App({
    port: _CONFIG.SERVER.PORT,
    isDev: !_CONFIG.IS_PROD,
});
app.start();
