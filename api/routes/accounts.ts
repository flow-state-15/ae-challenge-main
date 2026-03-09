import express from "express";
import accountController from "../controllers/accountController";

const router = express.Router();

router.get("/:accountID", accountController.getAccount);

export default router;
