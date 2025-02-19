import { clientIdSchema } from "../schema/client.schema.js";
import { productIdSchema } from "../schema/product.schema.js";
//import { loanIdSchema } from '../schema/loan.schema.js';

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

const validateLoanId = (req, res, next) => {
    try {
        loanIdSchema.parse({ loanId: +req.params.id });
        next();
    } catch (e) {
        res.status(400).json({ error: e.errors });
    }
};

export {validate,
    validateClientId,
    validateProductId,
    validateLoanId
};