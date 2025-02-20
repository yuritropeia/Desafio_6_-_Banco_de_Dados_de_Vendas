import { clientIdSchema } from "../schema/client.schema.js";
import { productIdSchema } from "../schema/product.schema.js";
import { stockIdSchema } from "../schema/stock.schema.js";
import { salesIdSchema } from "../schema/sales.schema.js";
import { orderIdSchema } from '../schema/order.schema.js';

const validate = (schema) => (req, res, next) => {
    try{
        schema.parse(req.body);
        next();
    } catch (e){
        res.status(400).json({error: e.errors});
    }
};

const validateClientId = (req, res, next) => {
    try{
        const clientId = Number(req.params.id);
        clientIdSchema.parse({clientId: clientId});
        next();
    } catch (e){
        res.status(400).json({error: e.errors});
    }
};

const validateProductId = (req, res, next) => {
    try{
        productIdSchema.parse({productId: +req.params.id});
        next();
    } catch (e){
        res.status(400).json({error: e.errors});
    }
};

const validateStockId = (req, res, next) => {
    try{
        stockIdSchema.parse({stockId: +req.params.id});
        next();
    } catch (e){
        res.status(400).json({error: e.errors});
    }
};

const validateSalesId = (req, res, next) => {
    try{
        salesIdSchema.parse({salesId: +req.params.id});
        next();
    } catch (e){
        res.status(400).json({error: e.errors});
    }
};

const validateOrderId = (req, res, next) => {
    try {
        orderIdSchema.parse({ orderId: +req.params.id });
        next();
    } catch (e) {
        res.status(400).json({ error: e.errors });
    }
};

export {validate,
    validateClientId,
    validateProductId,
    validateOrderId,
    validateStockId,
    validateSalesId
};