"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCompaniesHandler = listCompaniesHandler;
exports.createCompanyHandler = createCompanyHandler;
exports.addRouteHandler = addRouteHandler;
const zod_1 = require("zod");
const transport_service_1 = require("../services/transport.service");
async function listCompaniesHandler(_req, res) {
    const companies = await (0, transport_service_1.listTransportCompanies)();
    res.json({ companies });
}
const companySchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
});
async function createCompanyHandler(req, res) {
    const parse = companySchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    const company = await (0, transport_service_1.createTransportCompany)(parse.data);
    res.status(201).json({ company });
}
const routeSchema = zod_1.z.object({
    originCity: zod_1.z.string().min(2),
    destinationCity: zod_1.z.string().min(2),
    departureTimes: zod_1.z.string().optional(),
    daysOfWeek: zod_1.z.string().optional(),
    priceFrom: zod_1.z.number().optional(),
});
async function addRouteHandler(req, res) {
    const companyId = req.params.companyId;
    const parse = routeSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    const route = await (0, transport_service_1.addRoute)(companyId, parse.data);
    res.status(201).json({ route });
}
