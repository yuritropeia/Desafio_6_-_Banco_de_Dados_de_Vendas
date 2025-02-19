import { Router } from "express";
import productControllers from "../controller/product.controllers.js";
import {validate, validateProductId} from '../middlewares/validation.middlewares.js';
import { productSchema } from "../schema/product.schema.js";

const router = Router();

router.get("/", productControllers.findAllProductsController);

router.post(
    '/', 
    validate(productSchema),
    productControllers.createProductController
);

router.get("/search", productControllers.searchProductsController);
router.get("/:id", validateProductId, productControllers.findProductByIdController);
router.patch("/:id", validateProductId, productControllers.updateProductController);
router.delete("/:id", validateProductId, productControllers.deleteProductController);


export default router;