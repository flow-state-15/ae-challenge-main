import express from "express";

import transactionController from "../controllers/transactionController";

const router = express.Router();

router.post("/:accountID/withdraw", transactionController.withdraw);
router.post("/:accountID/deposit", transactionController.deposit);

export default router;
