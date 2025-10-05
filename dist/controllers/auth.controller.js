"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerClientHandler = registerClientHandler;
exports.registerDriverHandler = registerDriverHandler;
exports.loginHandler = loginHandler;
const zod_1 = require("zod");
const auth_service_1 = require("../services/auth.service");
const clientRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6),
    phone: zod_1.z.string().optional(),
});
const driverRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6),
    phone: zod_1.z.string().min(6),
    nationalIdNumber: zod_1.z.string().min(4),
    emergencyContact: zod_1.z.string().min(1),
    emergencyContactPhone: zod_1.z.string().min(6),
    emergencyContactAddress: zod_1.z.string().min(3),
    homeAddress: zod_1.z.string().min(3),
    vehicleType: zod_1.z.string().optional(),
    licensePlate: zod_1.z.string().optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
async function registerClientHandler(req, res) {
    const parse = clientRegisterSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    try {
        const token = await (0, auth_service_1.registerClient)(parse.data);
        res.status(201).json({ token });
    }
    catch (e) {
        if (e.message === 'EMAIL_IN_USE')
            return res.status(409).json({ error: 'Email déjà utilisé' });
        return res.status(500).json({ error: 'Erreur serveur' });
    }
}
async function registerDriverHandler(req, res) {
    const parse = driverRegisterSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    try {
        const token = await (0, auth_service_1.registerDriver)(parse.data);
        res.status(201).json({ token });
    }
    catch (e) {
        if (e.message === 'EMAIL_IN_USE')
            return res.status(409).json({ error: 'Email déjà utilisé' });
        return res.status(500).json({ error: 'Erreur serveur' });
    }
}
async function loginHandler(req, res) {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    try {
        const token = await (0, auth_service_1.login)(parse.data);
        res.json({ token });
    }
    catch (e) {
        if (e.message === 'INVALID_CREDENTIALS')
            return res.status(401).json({ error: 'Identifiants invalides' });
        return res.status(500).json({ error: 'Erreur serveur' });
    }
}
