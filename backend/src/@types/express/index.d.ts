import { User } from '@models';

declare namespace Express {
    export interface Request {
        user?: User;
    }
}
