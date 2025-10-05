import { prisma } from '../config/prisma';

export async function createDelivery(params: {
  clientUserId: string;
  pickupAddress: string;
  dropoffAddress: string;
  notes?: string;
  price?: number;
}) {
  const client = await prisma.client.findUnique({ where: { userId: params.clientUserId } });
  if (!client) throw new Error('NOT_A_CLIENT');
  return prisma.delivery.create({
    data: {
      clientId: client.id,
      pickupAddress: params.pickupAddress,
      dropoffAddress: params.dropoffAddress,
      notes: params.notes,
      price: params.price,
    },
  });
}
