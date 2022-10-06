/**
 *  Login route and login/logout handler
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import * as bcrypt from 'bcrypt';
import { IRequest, IResponse } from '../../interfaces/vendors/express';
import { IApiResponse } from '../../interfaces/ApiResponse';
import User from '../../models/User';

class Login {
  public static async postLogin(req: IRequest, res: IResponse) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const response: IApiResponse = {
        ok: false,
        status: 422,
        flash: { result: 'error', message: 'Invalid email or password typed.' }
      };
      res.send(response);
    } else {
      try {
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save((error) => {
            console.log(error);
          });
          const response: IApiResponse = {
            ok: true,
            status: 200,
            flash: { result: 'success', message: 'Hurray! User has been logged in!' },
            body: {
              userId: user.id,
              email: user.email,
              username: user.username,
              profileImage: user.profileImage
            }
          };
          res.send(response);
        } else {
          const response: IApiResponse = {
            ok: false,
            status: 422,
            flash: { result: 'error', message: 'Invalid email or password typed.' }
          };
          res.send(response);
        }
      } catch (error) {
        console.log(error);
        const response: IApiResponse = {
          ok: false,
          status: 500,
          flash: { result: 'error', message: 'Encountered error while saving session.' }
        };
        res.send(response);
      }
    }
  }
}

export default Login;
