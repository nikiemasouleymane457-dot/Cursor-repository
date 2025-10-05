"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transport_controller_1 = require("../../controllers/transport.controller");
const router = (0, express_1.Router)();
router.get('/', transport_controller_1.listCompaniesHandler);
router.post('/', transport_controller_1.createCompanyHandler);
router.post('/:companyId/routes', transport_controller_1.addRouteHandler);
exports.default = router;
