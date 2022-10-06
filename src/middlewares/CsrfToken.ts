/**
 * Cross Site Request Forgery Token authorizaton
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import csurf from 'csurf';
import { Application } from 'express';
import { IRequest, IResponse, INext } from '../interfaces/vendors/express';

class CsrfToken {
  public static init(expressApp: Application) {
    const csrfProtection = csurf();
    expressApp.use('/login', csrfProtection);
    expressApp.use('/signup', csrfProtection);

    const authLocals = (req: IRequest, res: IResponse, next: INext) => {
      res.locals.isAuthenticated = req.session.isLoggedIn;
      res.locals.csrfToken = req.csrfToken();
      next();
    };

    expressApp.use('/login', authLocals);
    expressApp.use('/signup', authLocals);
  }
}

export default CsrfToken;
