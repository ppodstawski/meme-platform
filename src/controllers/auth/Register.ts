/**
 *  Signup route and registration handler
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import * as bcrypt from 'bcrypt';
import { IRequest, IResponse } from '../../interfaces/vendors/express';
import User from '../../models/User';

class Register {
  public static async postSignup(req: IRequest, res: IResponse) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    // @todo const confirmPassword = req.body.confirmPassword;

    let user = await User.findOne({ where: { email: email } });

    if (user) {
      // req.flash('errors', 'E-Mail exists already, please pick a different one.');
      res.send({ result: 'error', message: 'E-Mail exists already, please pick a different one.' });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);

        user = await User.create({
          username,
          email,
          password: hashedPassword
        });

        // @todo send verification email

        if (user) {
          res.send({ result: 'success', message: 'User created. Please check your email to verify account.' });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export default Register;
