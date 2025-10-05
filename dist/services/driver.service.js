"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOnlineDrivers = listOnlineDrivers;
exports.setDriverOnlineStatus = setDriverOnlineStatus;
const prisma_1 = require("../config/prisma");
async function listOnlineDrivers() {
    return prisma_1.prisma.driver.findMany({
        where: { isOnline: true },
        include: { user: { select: { firstName: true, lastName: true, phone: true } } },
    });
}
async function setDriverOnlineStatus(userId, isOnline) {
    const driver = await prisma_1.prisma.driver.findUnique({ where: { userId } });
    if (!driver)
        throw new Error('NOT_A_DRIVER');
    return prisma_1.prisma.driver.update({ where: { id: driver.id }, data: { isOnline } });
}
