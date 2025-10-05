import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { getOnlineDriversHandler, setOnlineStatusHandler } from '../../controllers/driver.controller';

const router = Router();

router.get('/online', getOnlineDriversHandler);
router.post('/me/status', requireAuth, setOnlineStatusHandler);

export default router;
