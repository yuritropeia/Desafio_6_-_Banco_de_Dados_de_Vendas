import { Router } from "express";
import clientControllers from "../controller/client.controllers.js";
import {validate, validateClientId} from '../middlewares/validation.middlewares.js';
import { clientSchema } from "../schema/client.schema.js";

const router = Router();

router.post(
    '/', 
    validate(clientSchema),
    clientControllers.createClientController
);

router.get("/", clientControllers.findAllClientsController);

router.get('/:id', validateClientId, clientControllers.findClientByIdController);

router.patch(
    '/:id', 
    validateClientId,
    clientControllers.updateClientController
);

router.delete("/:id", validateClientId,clientControllers.deleteClientController);

export default router;