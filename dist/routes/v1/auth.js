"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/register/client', auth_controller_1.registerClientHandler);
router.post('/register/driver', auth_controller_1.registerDriverHandler);
router.post('/login', auth_controller_1.loginHandler);
exports.default = router;
