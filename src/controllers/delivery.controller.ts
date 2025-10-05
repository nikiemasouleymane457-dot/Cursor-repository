import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { createDelivery } from '../services/delivery.service';

const createSchema = z.object({
  pickupAddress: z.string().min(3),
  dropoffAddress: z.string().min(3),
  notes: z.string().optional(),
  price: z.number().optional(),
});

export async function createDeliveryHandler(req: AuthRequest, res: Response) {
  if (!req.userId || req.role !== 'CLIENT') return res.status(403).json({ error: 'Forbidden' });
  const parse = createSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  try {
    const delivery = await createDelivery({ clientUserId: req.userId, ...parse.data });
    res.status(201).json({ delivery });
  } catch (e: any) {
    if (e.message === 'NOT_A_CLIENT') return res.status(400).json({ error: 'Utilisateur non client' });
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
