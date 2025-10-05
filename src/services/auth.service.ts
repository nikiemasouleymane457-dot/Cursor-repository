import { prisma } from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerClient(params: { email: string; firstName: string; lastName: string; password: string; phone?: string }) {
  const existing = await prisma.user.findUnique({ where: { email: params.email } });
  if (existing) throw new Error('EMAIL_IN_USE');
  const passwordHash = await bcrypt.hash(params.password, 10);
  const user = await prisma.user.create({
    data: {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      phone: params.phone,
      passwordHash,
      role: 'CLIENT',
      client: { create: {} },
    },
  });
  return signToken(user.id, 'CLIENT');
}

export async function registerDriver(params: {
  email: string; firstName: string; lastName: string; password: string; phone: string;
  nationalIdNumber: string; emergencyContact: string; emergencyContactPhone: string; emergencyContactAddress: string; homeAddress: string;
  vehicleType?: string; licensePlate?: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: params.email } });
  if (existing) throw new Error('EMAIL_IN_USE');
  const passwordHash = await bcrypt.hash(params.password, 10);
  const user = await prisma.user.create({
    data: {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      phone: params.phone,
      passwordHash,
      role: 'DRIVER',
      driver: {
        create: {
          nationalIdNumber: params.nationalIdNumber,
          emergencyContact: params.emergencyContact,
          emergencyContactPhone: params.emergencyContactPhone,
          emergencyContactAddress: params.emergencyContactAddress,
          homeAddress: params.homeAddress,
          vehicleType: params.vehicleType,
          licensePlate: params.licensePlate,
        },
      },
    },
  });
  return signToken(user.id, 'DRIVER');
}

export async function login(params: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: params.email } });
  if (!user) throw new Error('INVALID_CREDENTIALS');
  const ok = await bcrypt.compare(params.password, user.passwordHash);
  if (!ok) throw new Error('INVALID_CREDENTIALS');
  return signToken(user.id, user.role);
}

function signToken(userId: string, role: 'CLIENT'|'DRIVER'|'ADMIN') {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
  return jwt.sign({ role }, secret, { subject: userId, expiresIn: '7d' });
}
