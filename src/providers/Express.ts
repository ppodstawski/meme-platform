/**
 * Express server settings - middlewares and routes
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import path from 'path';
import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import sessionSequelize from 'express-session-sequelize';
import cors from 'cors';

import Locals from './Locals';
import Database from './Database';
import Multer from '../utils/Multer';
import apiRoutes from '../routes/api/index';
import apiAuthRoutes from '../routes/api/Auth';
import reactAppRoutes from '../routes/app/NextJS';
import { IRequest, IResponse } from '../interfaces/vendors/express';
import CsrfToken from '../middlewares/CsrfToken';
import SocketIO from './SocketIO';

class Express {
  public static async init(expressApp: express.Application) {
    const corsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
        'Cookie'
      ],
      credentials: true, // this allows to send back (to client) cookies
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: 'http://localhost:3000',
      preflightContinue: false
    };

    expressApp.use(cors(corsOptions));

    const sessionStore = sessionSequelize(expressSession.Store);
    const sequelizeSessionStore = new sessionStore({
      db: Database.sequelize
    });

    expressApp.use(
      expressSession({
        name: 'chungus',
        secret: Locals.config().appSecret,
        store: sequelizeSessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
          expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: false,
          sameSite: 'strict'
        }
      })
    );

    expressApp.use(bodyParser.urlencoded({ extended: false }));

    expressApp.use(bodyParser.json());
    expressApp.use(cookieParser());
    expressApp.use(Multer.mount());
    expressApp.use(express.static(path.join(__dirname, '../../public')));
    expressApp.use('/images', express.static(path.join(__dirname, '../../images')));

    expressApp.use('/api', apiRoutes);

    // Check only auth API routes for CSRF token
    CsrfToken.init(expressApp);
    expressApp.use('/api', apiAuthRoutes);

    expressApp.use(reactAppRoutes);

    expressApp.use((req: IRequest, res: IResponse) => {
      res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
    });

    const httpServer = createServer(expressApp);
    SocketIO.init(httpServer);
    httpServer.listen(Locals.config().appPort);
    console.log(`> App ready on ${Locals.config().appHost}:${Locals.config().appPort || 3000}`);
  }
}

export default Express;
