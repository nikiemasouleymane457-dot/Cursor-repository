import { prisma } from '../config/prisma';
import { Request, Response } from 'express';
import { z } from 'zod';
import { login, registerClient, registerDriver } from '../services/auth.service';

const bcrypt = require('bcryptjs');

async function registerClientHandler(req, res) {
  try {
    const { email, Name, surName, password, phone } = clientRegisterSchema.parse(req.body);

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Créer l'utilisateur avec passwordHash
    const user = await prisma.user.create({
      data: {
        email,
        Name,
        surName,
        phone,
        passwordHash,        // ← crucial : pas "password"
        role: 'CLIENT',
      },
      select: {
        id: true,
        email: true,
        Name: true,
        surName: true,
        role: true,
      },
    });

    return res.status(201).json({ message: 'Client inscrit avec succès', user });
  } catch (error) {
    console.error('Erreur inscription client:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

const driverRegisterSchema = z.object({
  email: z.string().email(),
  Name: z.string().min(1),
  surName: z.string().min(1),
  password: z.string().min(6),
  phone: z.string().min(6),
  nationalIdNumber: z.string().min(4),
  emergencyContact: z.string().min(1),
  emergencyContactPhone: z.string().min(6),
  emergencyContactAddress: z.string().min(3),
  homeAddress: z.string().min(3),
  vehicleType: z.string().optional(),
  licensePlate: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerClientHandler(req: Request, res: Response) {
  const parse = clientRegisterSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  try {
    const token = await registerClient(parse.data);
    res.status(201).json({ token });
  } catch (e: any) {
    if (e.message === 'EMAIL_IN_USE') return res.status(409).json({ error: 'Email déjà utilisé' });
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function registerDriverHandler(req: Request, res: Response) {
  const parse = driverRegisterSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  try {
    const token = await registerDriver(parse.data);
    res.status(201).json({ token });
  } catch (e: any) {
    if (e.message === 'EMAIL_IN_USE') return res.status(409).json({ error: 'Email déjà utilisé' });
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function loginHandler(req: Request, res: Response) {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  try {
    const token = await login(parse.data);
    res.json({ token });
  } catch (e: any) {
    if (e.message === 'INVALID_CREDENTIALS') return res.status(401).json({ error: 'Identifiants invalides' });
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
