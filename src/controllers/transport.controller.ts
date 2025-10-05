import { Request, Response } from 'express';
import { z } from 'zod';
import { addRoute, createTransportCompany, listTransportCompanies } from '../services/transport.service';

export async function listCompaniesHandler(_req: Request, res: Response) {
  const companies = await listTransportCompanies();
  res.json({ companies });
}

const companySchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
});

export async function createCompanyHandler(req: Request, res: Response) {
  const parse = companySchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const company = await createTransportCompany(parse.data);
  res.status(201).json({ company });
}

const routeSchema = z.object({
  originCity: z.string().min(2),
  destinationCity: z.string().min(2),
  departureTimes: z.string().optional(),
  daysOfWeek: z.string().optional(),
  priceFrom: z.number().optional(),
});

export async function addRouteHandler(req: Request, res: Response) {
  const companyId = req.params.companyId;
  const parse = routeSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const route = await addRoute(companyId, parse.data);
  res.status(201).json({ route });
}
