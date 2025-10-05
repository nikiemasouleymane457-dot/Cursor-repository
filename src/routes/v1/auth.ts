import { Router } from 'express';
import { loginHandler, registerClientHandler, registerDriverHandler } from '../../controllers/auth.controller';

const router = Router();

router.post('/register/client', registerClientHandler);
router.post('/register/driver', registerDriverHandler);
router.post('/login', loginHandler);

export default router;
