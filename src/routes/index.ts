import { Router } from 'express';
import authRouter from './v1/auth';
import driverRouter from './v1/drivers';
import transportRouter from './v1/transports';
import deliveryRouter from './v1/deliveries';

export const router = Router();

router.use('/v1/auth', authRouter);
router.use('/v1/drivers', driverRouter);
router.use('/v1/transports', transportRouter);
router.use('/v1/deliveries', deliveryRouter);
