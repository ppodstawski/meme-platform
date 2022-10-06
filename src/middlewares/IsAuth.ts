/**
 * Short middleware to check if user is authenticated
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { Middleware } from 'express-validator/src/base';
import { IRequest, IResponse, INext } from '../interfaces/vendors/express';

class IsAuth {
  public static check(): Middleware {
    return (req: IRequest, res: IResponse, next: INext) => {
      if (!req.session.isLoggedIn) {
        return res.redirect('/login');
      }
      next();
    };
  }
}

export default IsAuth.check();
