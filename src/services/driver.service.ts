import { prisma } from '../config/prisma';

export async function listOnlineDrivers() {
  return prisma.driver.findMany({
    where: { isOnline: true },
    include: { user: { select: { firstName: true, lastName: true, phone: true } } },
  });
}

export async function setDriverOnlineStatus(userId: string, isOnline: boolean) {
  const driver = await prisma.driver.findUnique({ where: { userId } });
  if (!driver) throw new Error('NOT_A_DRIVER');
  return prisma.driver.update({ where: { id: driver.id }, data: { isOnline } });
}
