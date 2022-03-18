/* eslint-disable @typescript-eslint/tslint/config */
import { TYPES } from '../types/types';
import * as express from 'express';
import {
    interfaces,
    controller,
    httpPost,
    httpGet,
    request,
    response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { OAuth2Client } from 'google-auth-library';
import * as config from '../config/app.config';

@controller('/account')
export class AccountController implements interfaces.Controller {

    private readonly oaut2Client: OAuth2Client;

    constructor() {
        this.oaut2Client = new OAuth2Client(
            config.GOOGLE.CLIENT_ID,
            config.GOOGLE.CLIENT_SECRET,
        );
    }

    @httpPost('/login')
    private async login(@request() req: express.Request, @response() res: express.Response) {
        try {
            if (req.body.token) {
                const ticket = await this.oaut2Client
                    .verifyIdToken({
                        idToken: req.body.token,
                        audience: config.GOOGLE.CLIENT_ID,
                    });
                const payload = ticket.getPayload();
                res.json(payload);
                return;
            }
        } catch (err) { console.log(err); }
        res.status(400).json({ error: 'Invalid Credentials' });
    }
}
