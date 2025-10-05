"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const delivery_controller_1 = require("../../controllers/delivery.controller");
const router = (0, express_1.Router)();
router.post('/', auth_1.requireAuth, delivery_controller_1.createDeliveryHandler);
exports.default = router;
