import { Router } from "express";
import bookControllers from "../controller/book.controllers.js";
import {validate, validateBookId} from '../middlewares/validation.middlewares.js';
import { bookSchema } from "../schema/book.schema.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", bookControllers.findAllBooksController);

router.use(authMiddleware);

router.post(
    '/', 
    validate(bookSchema),
    authMiddleware,
    bookControllers.createBookController
);

router.get("/search", bookControllers.searchBooksController);
router.get("/:id", validateBookId, bookControllers.findBookByIdController);
router.patch("/:id", validateBookId, bookControllers.updateBookController);
router.delete("/:id", validateBookId, bookControllers.deleteBookController);


export default router;