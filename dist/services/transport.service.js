"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTransportCompanies = listTransportCompanies;
exports.createTransportCompany = createTransportCompany;
exports.addRoute = addRoute;
const prisma_1 = require("../config/prisma");
async function listTransportCompanies() {
    return prisma_1.prisma.transportCompany.findMany({ include: { routes: true } });
}
async function createTransportCompany(params) {
    return prisma_1.prisma.transportCompany.create({ data: params });
}
async function addRoute(companyId, route) {
    return prisma_1.prisma.transportRoute.create({
        data: { ...route, companyId },
    });
}
