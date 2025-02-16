import { Router } from "express";
import userControllers from "../controller/user.controllers.js";
import {validate, validateUserId} from '../middlewares/validation.middlewares.js';
import { userSchema } from "../schema/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post(
    '/', 
    validate(userSchema),
    userControllers.createUserController
);

router.post(
    '/login', 
    userControllers.loginUserController
);

router.use(authMiddleware);

router.get("/", userControllers.findAllUsersController);

router.get('/:id', validateUserId, userControllers.findUserByIdController);

router.patch(
    '/:id', 
    validateUserId,
    userControllers.updateUserController
);

router.delete("/:id", validateUserId,userControllers.deleteUserController);

export default router;