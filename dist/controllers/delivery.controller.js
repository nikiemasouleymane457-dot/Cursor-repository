"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeliveryHandler = createDeliveryHandler;
const zod_1 = require("zod");
const delivery_service_1 = require("../services/delivery.service");
const createSchema = zod_1.z.object({
    pickupAddress: zod_1.z.string().min(3),
    dropoffAddress: zod_1.z.string().min(3),
    notes: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
});
async function createDeliveryHandler(req, res) {
    if (!req.userId || req.role !== 'CLIENT')
        return res.status(403).json({ error: 'Forbidden' });
    const parse = createSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    try {
        const delivery = await (0, delivery_service_1.createDelivery)({ clientUserId: req.userId, ...parse.data });
        res.status(201).json({ delivery });
    }
    catch (e) {
        if (e.message === 'NOT_A_CLIENT')
            return res.status(400).json({ error: 'Utilisateur non client' });
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
