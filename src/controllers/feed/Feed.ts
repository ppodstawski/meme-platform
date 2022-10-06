/**
 * Get All Memes Available For The Feeder
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { IRequest, IResponse } from '../../interfaces/vendors/express';
import { IApiResponse } from '../../interfaces/ApiResponse';
import Meme from '../../models/Meme';
import User from '../../models/User';
import Comment from '../../models/Comment';
import Reaction from '../../models/Reaction';

class Feed {
  public static async getMemes(req: IRequest, res: IResponse): Promise<void> {
    try {
      const feedItems = await Meme.findAll({
        attributes: ['id', 'title', 'imageUrl', 'description', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                attributes: ['username', 'profileImage']
              }
            ]
          },
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
        flash: { result: 'success', message: 'Feed successfully sent!' },
        body: feedItems
      };
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Feed;
