import { Router } from 'express';
import { createCompanyHandler, listCompaniesHandler, addRouteHandler } from '../../controllers/transport.controller';

const router = Router();

router.get('/', listCompaniesHandler);
router.post('/', createCompanyHandler);
router.post('/:companyId/routes', addRouteHandler);

export default router;
