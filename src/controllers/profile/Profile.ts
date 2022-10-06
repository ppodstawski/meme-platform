/**
 * Editing profile information controller
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { IRequest, IResponse } from '../../interfaces/vendors/express';
import { IApiResponse } from '../../interfaces/ApiResponse';
import FileOperations from '../../utils/FileOperations';
import User from '../../models/User';

class Profile {
  public static async getInfo(req: IRequest, res: IResponse): Promise<void> {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    try {
      let user = await User.findOne({ where: { id: req.session.user.id } });

      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'User information gathered successfully.' },
        body: {
          id: user.id,
          email: user.email,
          username: user.username,
          description: user.description,
          profileImage: user.profileImage
        }
      };
      res.send(response);
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered error getting user data.' }
      };
      res.send(response);
    }
  }
  public static async update(req: IRequest, res: IResponse): Promise<void> {
    if (!req.session.user) {
      const response: IApiResponse = {
        ok: false,
        status: 401,
        flash: { result: 'error', message: 'You are not logged in.' }
      };
      res.send(response);
    }

    const updatedTitle = req.body.username;
    const updatedDesc = req.body.description;

    try {
      const user = await User.findByPk(req.session.user.id);

      if (req.file) {
        FileOperations.delete(user.profileImage);
        user.profileImage = req.file.path;
      }

      user.username = updatedTitle;
      user.description = updatedDesc;

      await user.save();

      req.session.user = user;

      const response: IApiResponse = {
        ok: true,
        status: 200,
        flash: { result: 'success', message: 'User profile information has been updated!' }
      };
      res.send(response);
    } catch (error) {
      console.log(error);
      const response: IApiResponse = {
        ok: false,
        status: 500,
        flash: { result: 'error', message: 'Encountered error updating profile.' }
      };
      res.send(response);
    }
  }
}

export default Profile;
