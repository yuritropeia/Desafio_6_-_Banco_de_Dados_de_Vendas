import { Router } from "express";
import salesControllers from "../controller/sales.controllers.js";
import {validate, validateSalesId} from '../middlewares/validation.middlewares.js';
import { salesSchema } from "../schema/sales.schema.js";

const router = Router();

router.get("/", salesControllers.findAllSalesController);

router.post(
    '/', 
    validate(salesSchema),
    salesControllers.createSalesController
);

router.get("/:id", validateSalesId, salesControllers.findSalesByIdController);
router.patch("/:id", validateSalesId, salesControllers.updateSalesController);
router.delete("/:id", validateSalesId, salesControllers.deleteSalesController);


export default router;