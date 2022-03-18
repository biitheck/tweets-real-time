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
import { IUsersService } from '../interfaces';

@controller('/account')
export class AccountController implements interfaces.Controller {

    constructor(
        @inject(TYPES.IUsersService) private usersService: IUsersService,
    ) { }

    @httpPost('/login')
    private async login(@request() req: express.Request, @response() res: express.Response) {
        try {
            if (req.body.username && req.body.password) {
                const payload = await this.usersService
                    .generateLoginToken(req.body.username, req.body.password);
                res.json(payload);
                return;
            }
        } catch (err) { console.log(err); }
        res.status(400).json({ error: 'Invalid Credentials' });
    }

    @httpPost('/token')
    private async token(@request() req: express.Request, @response() res: express.Response) {
        try {
            if (req.body.token) {
                const result = await this.usersService
                    .validateToken(req.body.token);

                if (result) {
                    res.status(200).json(null);
                } else {
                    res.status(400).json({ error: 'Invalid Token' });
                }
                return;
            }
        } catch (err) { console.log(err); }
        res.status(400).json({ error: 'Invalid Token' });
    }

    @httpGet('/token')
    private getToken(@request() req: express.Request, @response() res: express.Response) {
        try {
            const token = this.usersService
                .generateUrlToken();
            res.json({ token });
            return;
        } catch (err) { console.log(err); }
        res.status(400).json({ error: 'Invalid Token' });
    }

    @httpPost('/logout')
    private logout(@request() req: express.Request, @response() res: express.Response) {
        res.status(200).send();
    }
}
