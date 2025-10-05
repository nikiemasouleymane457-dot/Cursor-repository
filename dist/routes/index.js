"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("./v1/auth"));
const drivers_1 = __importDefault(require("./v1/drivers"));
const transports_1 = __importDefault(require("./v1/transports"));
const deliveries_1 = __importDefault(require("./v1/deliveries"));
exports.router = (0, express_1.Router)();
exports.router.use('/v1/auth', auth_1.default);
exports.router.use('/v1/drivers', drivers_1.default);
exports.router.use('/v1/transports', transports_1.default);
exports.router.use('/v1/deliveries', deliveries_1.default);
