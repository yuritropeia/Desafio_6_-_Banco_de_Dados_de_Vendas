import orderController from "../controller/order.controllers.js";
import {
  validate,
  validateOrderId,
} from "../middlewares/validation.middlewares.js";

import { Router } from "express";
import { orderSchema } from "../schema/order.schema.js";

const router = Router();

router.post("/", validate(orderSchema), orderController.createOrderController);
router.get("/", orderController.findAllOrdersController);
router.get("/:id", validateOrderId, orderController.findOrderByIdController);
router.delete("/:id", validateOrderId, orderController.deleteOrderController);
router.post("/:id", validate(orderSchema), orderController.updateOrderController);

export default router;