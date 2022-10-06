/**
 * API routes
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import express from 'express';
import { body } from 'express-validator';

import feedController from '../../controllers/feed/Feed';
import loginCheckController from '../../controllers/auth/LoginCheck';
import commentsController from '../../controllers/comments/Comments';
import myMemesController from '../../controllers/admin/MyMemes';
import myCommentsController from '../../controllers/admin/MyComments';
import memeAdminController from '../../controllers/admin/Meme';
import reactionsController from '../../controllers/reactions/Reactions';
import profileController from '../../controllers/profile/Profile';
import IsAuth from '../../middlewares/IsAuth';

const router = express.Router();

router.post('/logout', IsAuth, loginCheckController.postLogout);
router.post(
  '/add-meme',
  [body('title').isString().isLength({ min: 3 }).trim(), body('description').isLength({ min: 5, max: 400 }).trim()],
  IsAuth,
  memeAdminController.addMeme
);
router.post('/post-comment', IsAuth, commentsController.postComment);
router.post('/get-meme', IsAuth, memeAdminController.getMeme);
router.post('/add-reaction', IsAuth, reactionsController.add);

router.patch(
  '/update-meme',
  [body('title').isString().isLength({ min: 3 }).trim(), body('description').isLength({ min: 5, max: 400 }).trim()],
  IsAuth,
  memeAdminController.editMeme
);
router.patch('/update-comment', IsAuth, commentsController.update);
router.patch('/update-profile', IsAuth, profileController.update);

router.delete('/delete-meme', IsAuth, memeAdminController.deleteMeme);
router.delete('/delete-comment', IsAuth, commentsController.delete);
router.delete('/remove-reaction', IsAuth, reactionsController.remove);

router.get('/get-profile-info', IsAuth, profileController.getInfo);
router.get('/get-my-memes', IsAuth, myMemesController.getAll);
router.get('/get-my-comments', IsAuth, myCommentsController.getAll);
router.get('/get-feed', feedController.getMemes);
router.get('/is-logged-in', loginCheckController.isLoggedIn);

export default router;
