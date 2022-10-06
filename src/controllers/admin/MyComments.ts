/**
 * Get All Comments Available For The User for Admin Page
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { IRequest, IResponse } from '../../interfaces/vendors/express';
import { IApiResponse } from '../../interfaces/ApiResponse';
import Comment from '../../models/Comment';
import Meme from '../../models/Meme';

class MyComments {
  public static async getAll(req: IRequest, res: IResponse): Promise<void> {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    try {
      const comments = await Comment.findAll({
        where: { UserId: req.session.user.id },
        include: [
          {
            model: Meme,
            attributes: ['title', 'imageUrl']
          }
        ]
      });
      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'User comments successfully sent!' },
        body: comments
      };
      res.send(response);
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered internal server error.' }
      };
      res.send(response);
    }
  }
}

export default MyComments;
