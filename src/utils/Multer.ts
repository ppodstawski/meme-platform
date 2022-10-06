/**
 * Multer configuration and init
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import multer from 'multer';
import { FileFilterCallback } from 'multer';
import { IRequest } from '../interfaces/vendors/express';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

class Multer {
  public static mount() {
    const fileStorage = multer.diskStorage({
      destination: (req: IRequest, file: Express.Multer.File, cb: DestinationCallback) => {
        if (req.url.includes('update-profile')) {
          cb(null, 'images/profile');
        } else {
          cb(null, 'images');
        }
      },
      filename: (req: IRequest, file: Express.Multer.File, cb: FileNameCallback) => {
        const dateNow = new Date().toISOString();
        const imgDate = dateNow
          .replace('T', ' ')
          .substring(0, 19)
          .replace(':', '-')
          .replace(':', '-')
          .replace(' ', '-');
        cb(null, imgDate + '-' + file.originalname);
      }
    });

    const fileFilter = (req: IRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    return multer({
      storage: fileStorage,
      fileFilter: fileFilter
    }).single('image');
  }
}

export default Multer;
