import express from 'express';
import fs from 'fs';
import { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import authMiddleware from './middlewares/auth/auth.middleware';
import { DIContainer } from './config/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import './controllers/account.controller';
import './controllers/ready.controller';
import { TYPES } from './types/types';
import { TokenStore } from 'models';

class App {
    public express: Application;
    public port: number;
    public isDev: boolean;

    constructor(appInit: { port: number; isDev: boolean }) {

        this.express = express();
        this.port = appInit.port;
        this.isDev = appInit.isDev;

        this.serveStaticFiles();
        this.middlewares();
        this.routes();
    }

    public start(): void {
        const startMsg = `⚡️[server]: App is running at http://localhost:${this.port}`;
        const runFn = () => {
            console.log(startMsg);
        };

        if (this.isDev) {
            this.express.listen(this.port, '0.0.0.0', runFn);
        } else {
            this.express.listen(this.port, runFn);
        }
    }

    private serveStaticFiles(): void {
        const rootPath = process.cwd() + '/wwwroot/';

        if (fs.existsSync(`${rootPath}/index.html`)) {
            this.express.use(express.static(rootPath));
            this.express.get('/', (req, res, next) => {
                res.sendFile(`${rootPath}/index.html`);
            });
        } else {
            this.express.get('/', (req, res, next) => {
                res.status(404).send('oops..., something went wrong!');
            });
        }
    }

    private middlewares(): void {
        // Enable CORS.
        this.express.use('*', cors());
        this.express.use(compression());
        this.express.use(express.json({ limit: '50mb' }));
        this.express.use(authMiddleware);
    }

    private routes(): void {
        const server = new InversifyExpressServer(
            DIContainer,
            null,
            { rootPath: '/api/v1' },
            this.express
        );

        server.build();
    }
}

export default App;
