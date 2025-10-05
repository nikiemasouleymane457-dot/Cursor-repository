"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineDriversHandler = getOnlineDriversHandler;
exports.setOnlineStatusHandler = setOnlineStatusHandler;
const zod_1 = require("zod");
const driver_service_1 = require("../services/driver.service");
async function getOnlineDriversHandler(_req, res) {
    const drivers = await (0, driver_service_1.listOnlineDrivers)();
    res.json({ drivers });
}
const statusSchema = zod_1.z.object({ isOnline: zod_1.z.boolean() });
async function setOnlineStatusHandler(req, res) {
    if (!req.userId || req.role !== 'DRIVER')
        return res.status(403).json({ error: 'Forbidden' });
    const parse = statusSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    try {
        const updated = await (0, driver_service_1.setDriverOnlineStatus)(req.userId, parse.data.isOnline);
        res.json({ driver: updated });
    }
    catch (e) {
        if (e.message === 'NOT_A_DRIVER')
            return res.status(400).json({ error: 'Utilisateur non livreur' });
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
