import { prisma } from '../config/prisma';

export async function listTransportCompanies() {
  return prisma.transportCompany.findMany({ include: { routes: true } });
}

export async function createTransportCompany(params: { name: string; email?: string; phone?: string; description?: string; city?: string }) {
  return prisma.transportCompany.create({ data: params });
}

export async function addRoute(companyId: string, route: { originCity: string; destinationCity: string; departureTimes?: string; daysOfWeek?: string; priceFrom?: number }) {
  return prisma.transportRoute.create({
    data: { ...route, companyId },
  });
}
