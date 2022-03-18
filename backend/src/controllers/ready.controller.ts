import * as express from 'express';
import {
    interfaces,
    controller,
    httpGet,
    request,
    response,
} from 'inversify-express-utils';

@controller('/ready')
export class ReadyController implements interfaces.Controller {

    constructor() { }

    @httpGet('/')
    private async ready(@request() req: express.Request, @response() res: express.Response) {
        res.send('⚡️[server]: Api is running 🎉!!!');
    }
}