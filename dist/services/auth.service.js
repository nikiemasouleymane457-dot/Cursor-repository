"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerClient = registerClient;
exports.registerDriver = registerDriver;
exports.login = login;
const prisma_1 = require("../config/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function registerClient(params) {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email: params.email } });
    if (existing)
        throw new Error('EMAIL_IN_USE');
    const passwordHash = await bcryptjs_1.default.hash(params.password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName,
            phone: params.phone,
            passwordHash,
            role: 'CLIENT',
            client: { create: {} },
        },
    });
    return signToken(user.id, 'CLIENT');
}
async function registerDriver(params) {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email: params.email } });
    if (existing)
        throw new Error('EMAIL_IN_USE');
    const passwordHash = await bcryptjs_1.default.hash(params.password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName,
            phone: params.phone,
            passwordHash,
            role: 'DRIVER',
            driver: {
                create: {
                    nationalIdNumber: params.nationalIdNumber,
                    emergencyContact: params.emergencyContact,
                    emergencyContactPhone: params.emergencyContactPhone,
                    emergencyContactAddress: params.emergencyContactAddress,
                    homeAddress: params.homeAddress,
                    vehicleType: params.vehicleType,
                    licensePlate: params.licensePlate,
                },
            },
        },
    });
    return signToken(user.id, 'DRIVER');
}
async function login(params) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: params.email } });
    if (!user)
        throw new Error('INVALID_CREDENTIALS');
    const ok = await bcryptjs_1.default.compare(params.password, user.passwordHash);
    if (!ok)
        throw new Error('INVALID_CREDENTIALS');
    return signToken(user.id, user.role);
}
function signToken(userId, role) {
    const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
    return jsonwebtoken_1.default.sign({ role }, secret, { subject: userId, expiresIn: '7d' });
}
