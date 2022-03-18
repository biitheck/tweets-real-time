import { Response } from 'express';
import { IRequest } from '../../interfaces';

const allowPaths = [
    '/api/v1/account/login',
    '/api/v1/account/token',
    '/api/v1/account/logout',
    '/api/v1/ready',
    '/graphql',
];

const authMiddleware = async (req: IRequest, res: Response, next: any) => {
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
        const user = verifyUserToken(token);

        if (user) {
            req.user = user;
            next();
            return;
        }
    }

    res.status(401);
    res.send('UNAUTHORIZED');
};

export default authMiddleware;
