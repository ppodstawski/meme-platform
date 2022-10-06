import * as express from 'express';
import { IRequest, IResponse } from '../../interfaces/vendors/express';
import nextApp from '../../providers/NextJS';

const router = express.Router();
const handler = nextApp.getRequestHandler();

router.all('*', (req: IRequest, res: IResponse) => {
  return handler(req, res);
});

export default router;
