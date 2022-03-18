import { TYPES } from '../types/types';
import * as express from 'express';
import {
    interfaces,
    controller,
    httpGet,
    request,
    response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUsersService } from '../interfaces';

@controller('/ready')
export class ReadyController implements interfaces.Controller {

    constructor(
        @inject(TYPES.IUsersService) private usersService: IUsersService,
    ) { }

    @httpGet('/')
    private async ready(@request() req: express.Request, @response() res: express.Response) {
        res.send('⚡️[server]: Api is running 🎉!!!');
    }
}