import { Router } from "express";
import stockControllers from "../controller/stock.controllers.js";
import {validate, validateStockId} from '../middlewares/validation.middlewares.js';
import { stockSchema } from "../schema/stock.schema.js";

const router = Router();

router.get("/", stockControllers.findAllStockController);

router.post(
    '/', 
    validate(stockSchema),
    stockControllers.createStockController
);

router.get("/:id", validateStockId, stockControllers.findStockByIdController);
router.patch("/:id", validateStockId, stockControllers.updateStockController);
router.delete("/:id", validateStockId, stockControllers.deleteStockController);


export default router;