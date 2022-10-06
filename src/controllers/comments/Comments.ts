/**
 * Cool comments controllers with awesome socket.io support
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { IApiResponse } from '../../interfaces/ApiResponse';
import { IRequest, IResponse } from '../../interfaces/vendors/express';
import Comment from '../../models/Comment';
import Meme from '../../models/Meme';
import SocketIO from '../../providers/SocketIO';

class Comments {
  public static async postComment(req: IRequest, res: IResponse) {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const commentText = req.body.message;
    if (req.body.message.length > 1024) {
      const response: IApiResponse = {
        ok: false,
        status: 422,
        flash: { result: 'error', message: 'Comment is too long!' }
      };
      res.send(response);
    }

    const memeId = req.body.memeId;
    const commentUserId = req.session.user.id;
    const meme = await Meme.findOne({ where: { id: memeId } });
    const newComment = await meme.createComment({ message: commentText, UserId: commentUserId });

    if (newComment) {
      const commentToSend = {
        ...newComment
      };
      const io = SocketIO.get();
      io.emit('comments', {
        action: 'add-comment',
        comment: {
          // @ts-ignore
          ...commentToSend.dataValues,
          User: {
            username: req.session.user.username,
            profileImage: req.session.user.profileImage
          }
        }
      });

      const response: IApiResponse = {
        ok: true,
        status: 201,
        flash: { result: 'success', message: 'Yes! Comment has been created!' }
      };
      res.send(response);
    } else {
      const response: IApiResponse = {
        ok: false,
        status: 422,
        flash: { result: 'error', message: 'Comment is invalid format.' }
      };
      res.send(response);
    }
  }

  public static async delete(req: IRequest, res: IResponse) {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const commentId = req.body.commentId;

    try {
      const comment = await Comment.findByPk(commentId);

      if (comment.UserId !== req.session.user.id) {
        const response: IApiResponse = {
          ok: false,
          status: 403,
          flash: { result: 'error', message: 'User is trying to delete not owned comment.' }
        };
        res.send(response);
      }

      const MemeId = comment.MemeId;
      await comment.destroy();

      const io = SocketIO.get();
      io.emit('comments', {
        action: 'delete-comment',
        comment: {
          id: commentId,
          MemeId
        }
      });

      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'Comment has been deleted!' }
      };
      res.send(response);
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered error deleting comment.' }
      };
      res.send(response);
    }
  }

  public static async update(req: IRequest, res: IResponse) {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const commentId = req.body.commentId;
    const commentNewMessage = req.body.message;

    try {
      const comment = await Comment.findByPk(commentId);

      if (comment.UserId !== req.session.user.id) {
        const response: IApiResponse = {
          ok: false,
          status: 403,
          flash: { result: 'error', message: 'User is trying to updated not owned comment.' }
        };
        res.send(response);
      }

      const MemeId = comment.MemeId;
      await comment.update({ message: commentNewMessage });
      await comment.save();

      const io = SocketIO.get();
      io.emit('comments', {
        action: 'update-comment',
        comment: {
          id: commentId,
          message: commentNewMessage,
          MemeId
        }
      });

      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'Comment has been updated!' }
      };
      res.send(response);
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered error updating comment.' }
      };
      res.send(response);
    }
  }
}

export default Comments;
