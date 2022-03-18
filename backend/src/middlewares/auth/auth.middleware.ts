import { Response, Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import * as config from '../../config/app.config';

const allowPaths = [
    '/api/v1/account/login',
    '/api/v1/ready',
];

const authMiddleware = async (req: Request, res: Response, next: any) => {
    // Authorized urls.
    if (allowPaths.
        findIndex(f =>
            req.path.indexOf(f) > -1) > -1 ||
        req.path === '/') {
        next(); return;
    }
    let token = req.headers['authorization'] as string;

    if (token) {
        token = token.replace('Bearer ', '');
        
        const oaut2Client = new OAuth2Client(
            config.GOOGLE.CLIENT_ID,
            config.GOOGLE.CLIENT_SECRET,
        );

        const ticket = await oaut2Client
            .verifyIdToken({
                idToken: req.body.token,
                audience: config.GOOGLE.CLIENT_ID,
            });

        const payload = ticket.getPayload();

        if (payload) {
            next();
            return;
        }
    }

    res.status(401);
    res.send('UNAUTHORIZED');
};

export default authMiddleware;
