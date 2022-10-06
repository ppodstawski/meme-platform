/**
 * Beutiful reaction controllers with amazing socket.io support
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { IApiResponse } from '../../interfaces/ApiResponse';
import { IRequest, IResponse } from '../../interfaces/vendors/express';
import Reaction from '../../models/Reaction';
import User from '../../models/User';
import SocketIO from '../../providers/SocketIO';

class Reactions {
  public static async add(req: IRequest, res: IResponse) {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const memeId = req.body.memeId;
    const reactionType = req.body.type;
    const reactionUserId = req.session.user.id;
    const reactionUsername = req.session.user.username;

    if (memeId && reactionUserId) {
      try {
        const user = await User.findOne({
          where: { id: reactionUserId }
        });
        const userReactions = await user.getReactions({ where: { MemeId: memeId } });

        if (userReactions.length > 0) {
          if (user) {
            const response: IApiResponse = {
              ok: false,
              status: 200,
              flash: { result: 'success', message: 'User already reacted to this meme.' }
            };
            res.send(response);
          }
        } else {
          const reaction = await Reaction.findOne({ where: { type: reactionType, MemeId: memeId } });
          let reactionId = 0;

          if (reaction) {
            reactionId = reaction.id;
            await user.addReaction(reaction, { through: { type: reactionType, MemeId: memeId } });

            const response: IApiResponse = {
              ok: true,
              status: 201,
              flash: { result: 'success', message: 'Reaction has been added!' }
            };
            res.send(response);
          } else {
            const newReaction = await user.createReaction({ type: reactionType, MemeId: memeId });

            if (newReaction) {
              reactionId = newReaction.id;

              const response: IApiResponse = {
                ok: true,
                status: 201,
                flash: { result: 'success', message: 'Reaction has been created!' }
              };
              res.send(response);
            }
          }

          const io = SocketIO.get();
          io.emit('reactions', {
            action: 'add-reaction',
            user: {
              id: reactionUserId,
              username: reactionUsername
            },
            reaction: {
              id: reactionId,
              type: reactionType,
              memeId
            }
          });
        }
      } catch (error) {
        console.log(error);
        const response: IApiResponse = {
          ok: false,
          status: 500,
          flash: { result: 'error', message: 'Encountered error while adding reaction.' }
        };
        res.send(response);
      }
    } else {
      const response: IApiResponse = {
        ok: false,
        status: 422,
        flash: { result: 'error', message: 'Reaction request is invalid.' }
      };
      res.send(response);
    }
  }

  public static async remove(req: IRequest, res: IResponse) {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const memeId = req.body.memeId;
    const reactionUserId = req.session.user.id;
    const reactionUsername = req.session.user.username;

    if (memeId && reactionUserId) {
      try {
        const user = await User.findOne({
          where: { id: reactionUserId }
        });
        const userReactions = await user.getReactions({ where: { MemeId: memeId } });

        /*
         *  User can have only one reaction / reaction type
         *  to Meme hence using [0] so bravely here
         *  if not, then its a bug :(
         */
        const reactionIdToDelete = userReactions[0].id;
        const reactionType = userReactions[0].type;

        if (userReactions.length > 0) {
          const reaction = await Reaction.findOne({ where: { id: reactionIdToDelete } });
          await user.removeReaction(reaction);

          const checkReactionIfEmpty = await Reaction.findOne({ where: { MemeId: memeId, type: reactionType } });
          const reactionUsers = await checkReactionIfEmpty.getUsers();

          if (reactionUsers.length === 0) {
            await checkReactionIfEmpty.destroy();
          }

          const io = SocketIO.get();
          io.emit('reactions', {
            action: 'remove-reaction',
            user: {
              id: reactionUserId,
              username: reactionUsername
            },
            reaction: {
              id: reactionIdToDelete,
              memeId
            }
          });

          const response: IApiResponse = {
            ok: true,
            status: 200,
            flash: { result: 'success', message: 'Reaction has been removed!' }
          };
          res.send(response);
        } else {
          if (user) {
            const response: IApiResponse = {
              ok: false,
              status: 200,
              flash: { result: 'success', message: 'User did not reacted to this meme.' }
            };
            res.send(response);
          }
        }
      } catch (error) {
        console.log(error);
        const response: IApiResponse = {
          ok: false,
          status: 500,
          flash: { result: 'error', message: 'Encountered error while adding reaction.' }
        };
        res.send(response);
      }
    } else {
      const response: IApiResponse = {
        ok: false,
        status: 422,
        flash: { result: 'error', message: 'Reaction request is invalid.' }
      };
      res.send(response);
    }
  }
}

export default Reactions;
