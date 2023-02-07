import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import env from 'dotenv';

import { router } from './router';

import { PaginationInterface, UserInterface } from './model';

export const app = express();

env.config();

declare global {
    namespace Express {
        export interface Request {
            paginated: PaginationInterface,
            user: UserInterface | any,
        }
    }
}

const port = Number(process.env.PORT);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set security http headers
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// logger
app.use(morgan('dev'));

// cors
app.use(cors());

// v1 api routes
app.use('/api', router);

// set 404 routes
app.get('*', (req, res) => {
    res.status(404).json({
        message: 'ERROR 404 - PAGE NOT FOUND',
    });
});

app.listen(port, () => {
    console.log(`🚀 Server ready on port ${port}`)
});
