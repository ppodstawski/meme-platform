/**
 * API routes that need CSRF authorization
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import express from 'express';
import registerController from '../../controllers/auth/Register';
import loginController from '../../controllers/auth/Login';

const router = express.Router();

router.post('/signup', registerController.postSignup);
router.post('/login', loginController.postLogin);

export default router;
