import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { createDeliveryHandler } from '../../controllers/delivery.controller';

const router = Router();

router.post('/', requireAuth, createDeliveryHandler);

export default router;
