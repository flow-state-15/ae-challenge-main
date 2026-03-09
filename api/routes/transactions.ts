import express from "express";

import transactionController from "../controllers/transactionController";

const router = express.Router();

router.put("/:accountID/withdraw", transactionController.withdraw);
router.put("/:accountID/deposit", transactionController.deposit);

export default router;
