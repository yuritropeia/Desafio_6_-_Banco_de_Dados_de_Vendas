import loanController from "../controller/loan.controllers.js";
import {
  validate,
  validateLoanId,
} from "../middlewares/validation.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

import { Router } from "express";
import { loanSchema } from "../schema/loan.schema.js";

const router = Router();

router.use(authMiddleware);
router.post("/", validate(loanSchema), loanController.createLoanController);
router.get("/", loanController.findAllLoansController);
router.get("/:id", validateLoanId, loanController.findLoanByIdController);
router.delete("/:id", validateLoanId, loanController.deleteLoanController);

export default router;