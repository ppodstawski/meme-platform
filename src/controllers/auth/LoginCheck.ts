import { IApiResponse } from '../../interfaces/ApiResponse';
import { IRequest, IResponse } from '../../interfaces/vendors/express';

class LoginCheck {
  public static isLoggedIn(req: IRequest, res: IResponse) {
    if (req.session.user) {
      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'Yes user is logged in!' },
        body: {
          userId: req.session.user.id,
          email: req.session.user.email,
          username: req.session.user.username,
          profileImage: req.session.user.profileImage
        }
      };
      res.send(response);
    } else {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'User is not logged in!' }
      };
      res.send(response);
    }
  }

  public static postLogout(req: IRequest, res: IResponse) {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    req.session.destroy((error) => {
      if (error) {
        console.log(error);
        const response: IApiResponse = {
          ok: false,
          status: 500,
          flash: { result: 'error', message: 'Failed to destroy the session during logout.' }
        };
        res.send(response);
      }
      req.user = null;
      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'You were logged out.' }
      };
      res.send(response);
    });
  }
}

export default LoginCheck;
