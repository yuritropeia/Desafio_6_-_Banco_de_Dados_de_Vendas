import { Router } from "express";
import bookControllers from "../controller/book.controllers.js";
import {validate, validateBookId} from '../middlewares/validation.middlewares.js';
import { bookSchema } from "../schema/book.schema.js";

const router = Router();

router.get("/", bookControllers.findAllBooksController);

router.post(
    '/', 
    validate(bookSchema),
    bookControllers.createBookController
);

router.get("/search", bookControllers.searchBooksController);
router.get("/:id", validateBookId, bookControllers.findBookByIdController);
router.patch("/:id", validateBookId, bookControllers.updateBookController);
router.delete("/:id", validateBookId, bookControllers.deleteBookController);


export default router;