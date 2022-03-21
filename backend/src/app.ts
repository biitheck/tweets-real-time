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
import { Server } from 'socket.io';
import * as config from './config/app.config';
import { ETwitterStreamEvent, TweetStream, TweetV2SingleStreamResult, TwitterApi } from 'twitter-api-v2';

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
    }

    public start(): void {
        const startMsg = `⚡️[server]: App is running at http://localhost:${this.port}`;
        const runFn = () => {
            console.log(startMsg);
        };

        let instance: any;
        const app = this.buildServer();

        if (this.isDev) {
            instance = app.listen(this.port, '0.0.0.0', runFn);
        } else {
            instance = app.listen(this.port, runFn);
        }

        const io = new Server({
            cors: { origin: '*' },
        });

        io.listen(instance);

        /// API TWITTER ONLY SUPPORTS ONE STREAM WITH THIS API KEYS.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const streams: { [k: string]: TweetStream<TweetV2SingleStreamResult> } = {};

        io.on('connection', async (socket) => {
            const userId = socket.handshake?.auth?.userId;
            const token = socket.handshake?.auth?.token;
            const topics = socket.handshake?.query?.topics?.toString()?.split(',') || [];

            if (userId && token) {
                console.log(`Client connected: ${userId}, Topics: ${topics?.join(',')}`);

                await socket.join(userId);

                const twitterClient = new TwitterApi(config.TWITTER.BEARER_TOKEN);
                const rules = await twitterClient.v2.streamRules();

                // Cleanup all existing rules upon initiating
                if (rules?.data?.length > 0) {
                    await twitterClient.v2.updateStreamRules({
                        delete: {
                            ids: rules.data.map(rule => rule.id),
                        },
                    });
                }

                await twitterClient.v2.updateStreamRules({
                    add: topics.map(topic => ({ value: topic })),
                });

                try {
                    streams[userId] = await twitterClient.v2.searchStream({
                        'tweet.fields': ['id', 'text', 'created_at', 'author_id', 'public_metrics'],
                        'user.fields': ['username', 'name', 'profile_image_url', 'public_metrics', 'url'],
                        'media.fields': ['preview_image_url', 'url', 'width', 'height', 'type'],
                        'expansions': ['author_id', 'attachments.media_keys']
                    });


                    streams[userId].on(
                        ETwitterStreamEvent.Data,
                        eventData => {
                            setTimeout(() => {
                                console.log(eventData);
                                // stringify and parse json to get losing properties.
                                io.to(userId)
                                    .emit(
                                        'tweet',
                                        JSON.parse(JSON.stringify(eventData))
                                    );
                            }, 7500);
                        },
                    );

                    streams[userId].autoReconnect = true;

                } catch (err: any) {
                    if (err?.data) {
                        console.error('TWITTER API ERROR', err?.data);
                    } else {
                        console.error('Error no handler...');
                    }
                    socket.disconnect();
                }
            } else {
                socket.disconnect();
            }

            socket.on('disconnect', (event) => {
                // Close and delete user stream.
                if (streams[userId]) { 
                    streams[userId].close();
                    delete streams[userId];
                }
                console.log(`Client has disconnected ${userId}`);
            });
        });
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

    private buildServer(): express.Application {

        const server = new InversifyExpressServer(
            DIContainer,
            null,
            null,
            this.express,
        );

        return server.build();
    }
}

export default App;
