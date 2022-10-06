/**
 * Get All Memes Available For The User for Admin Page
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { IRequest, IResponse } from '../../interfaces/vendors/express';
import { IApiResponse } from '../../interfaces/ApiResponse';
import Meme from '../../models/Meme';
import Reaction from '../../models/Reaction';
import User from '../../models/User';

class MyMemes {
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
      const feedItems = await Meme.findAll({
        where: { UserId: req.session.user.id },
        attributes: ['id', 'title', 'imageUrl', 'description', 'createdAt'],
        include: [
          {
            model: Reaction,
            as: 'reactions',
            include: [
              {
                model: User,
                attributes: ['id', 'username']
              }
            ]
          }
        ]
      });
      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'User memes successfully sent!' },
        body: feedItems
      };
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default MyMemes;
