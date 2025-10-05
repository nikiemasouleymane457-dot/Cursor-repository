"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const driver_controller_1 = require("../../controllers/driver.controller");
const router = (0, express_1.Router)();
router.get('/online', driver_controller_1.getOnlineDriversHandler);
router.post('/me/status', auth_1.requireAuth, driver_controller_1.setOnlineStatusHandler);
exports.default = router;
