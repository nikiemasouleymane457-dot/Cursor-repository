import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { listOnlineDrivers, setDriverOnlineStatus } from '../services/driver.service';

export async function getOnlineDriversHandler(_req: AuthRequest, res: Response) {
  const drivers = await listOnlineDrivers();
  res.json({ drivers });
}

const statusSchema = z.object({ isOnline: z.boolean() });

export async function setOnlineStatusHandler(req: AuthRequest, res: Response) {
  if (!req.userId || req.role !== 'DRIVER') return res.status(403).json({ error: 'Forbidden' });
  const parse = statusSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  try {
    const updated = await setDriverOnlineStatus(req.userId, parse.data.isOnline);
    res.json({ driver: updated });
  } catch (e: any) {
    if (e.message === 'NOT_A_DRIVER') return res.status(400).json({ error: 'Utilisateur non livreur' });
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
