/**
 * Define Meme administration API logic
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { IRequest, IResponse } from '../../interfaces/vendors/express';
import { IApiResponse } from '../../interfaces/ApiResponse';
import FileOperations from '../../utils/FileOperations';
import Meme from '../../models/Meme';
import User from '../../models/User';

class MemeAdmin {
  public static async addMeme(req: IRequest, res: IResponse): Promise<void> {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const title = req.body.title;
    const image = req.file;
    const description = req.body.description;

    if (!image) {
      const response: IApiResponse = {
        ok: false,
        status: 422,
        flash: { result: 'error', message: 'Image not provided with Meme data!' }
      };
      res.send(response);
    }

    const imageUrl = image.path;

    try {
      let user = await User.findOne({ where: { id: req.session.user.id } });
      const meme = await user.createMeme({
        title: title,
        imageUrl: imageUrl,
        description: description
      });
      res.send({
        status: 201,
        flash: { result: 'success', message: 'OMG! Meme has been created!' },
        meme
      });
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered error adding meme.' }
      };
      res.send(response);
    }
  }

  public static async editMeme(req: IRequest, res: IResponse): Promise<void> {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const memeId = req.body.memeId;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;

    try {
      const meme = await Meme.findByPk(memeId);

      if (meme.UserId !== req.session.user.id) {
        const response: IApiResponse = {
          ok: false,
          status: 403,
          flash: { result: 'error', message: 'User is trying to edit not owned meme.' }
        };
        res.send(response);
      }

      if (req.file) {
        FileOperations.delete(meme.imageUrl);
        meme.imageUrl = req.file.path;
      }

      meme.title = updatedTitle;
      meme.description = updatedDesc;
      await meme.save();
      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'Meme has been updated!' },
        body: meme
      };
      res.send(response);
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered error updating meme.' }
      };
      res.send(response);
    }
  }

  public static async deleteMeme(req: IRequest, res: IResponse): Promise<void> {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const memeId = req.body.memeId;

    try {
      const meme = await Meme.findByPk(memeId);

      if (meme.UserId !== req.session.user.id) {
        const response: IApiResponse = {
          ok: false,
          status: 403,
          flash: { result: 'error', message: 'User is trying to edit not owned meme.' }
        };
        res.send(response);
      }

      FileOperations.delete(meme.imageUrl);
      await meme.destroy();

      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'Meme has been destroyed!' }
      };
      res.send(response);
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered error deleting meme.' }
      };
      res.send(response);
    }
  }

  public static async getMeme(req: IRequest, res: IResponse): Promise<void> {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const memeId = req.body.memeId;
    if (memeId) {
      try {
        let user = await User.findOne({ where: { id: req.session.user.id } });
        const meme = await user.getMemes({ where: { id: memeId } });

        if (!meme) {
          const response: IApiResponse = {
            ok: false,
            status: 404,
            flash: { result: 'error', message: 'Not found meme with this id for current user.' }
          };
          res.send(response);
        }
        const response: IApiResponse = {
          ok: true,
          status: 200,
          flash: { result: 'success', message: 'Meme has been found.' },
          body: meme
        };
        res.send(response);
      } catch (error) {
        console.log(error);
        const response: IApiResponse = {
          ok: false,
          status: 500,
          flash: { result: 'error', message: 'Encountered error getting meme.' }
        };
        res.send(response);
      }
    } else {
      const response: IApiResponse = {
        ok: false,
        status: 422,
        flash: { result: 'error', message: 'Invalid meme ID provided.' }
      };
      res.send(response);
    }
  }
}

export default MemeAdmin;
