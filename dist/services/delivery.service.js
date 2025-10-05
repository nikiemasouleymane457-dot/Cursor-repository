"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDelivery = createDelivery;
const prisma_1 = require("../config/prisma");
async function createDelivery(params) {
    const client = await prisma_1.prisma.client.findUnique({ where: { userId: params.clientUserId } });
    if (!client)
        throw new Error('NOT_A_CLIENT');
    return prisma_1.prisma.delivery.create({
        data: {
            clientId: client.id,
            pickupAddress: params.pickupAddress,
            dropoffAddress: params.dropoffAddress,
            notes: params.notes,
            price: params.price,
        },
    });
}
