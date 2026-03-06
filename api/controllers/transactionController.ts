import { Request, Response } from "express";
import Joi, { Schema } from "joi";
import { depositService, withdrawService } from "../services/transactionServices";

const transactionSchema: Schema = Joi.object({
    amount: Joi.number().positive().min(1).required(),
    accountID: Joi.number().positive().min(1).required(),
});

export async function withdraw(req: Request, res: Response) {
    const { accountID } = req.params;
    const { amount } = req.body;
    const parsedAccountId = parseInt(accountID, 10);

    const { error } = transactionSchema.validate({ accountID: parsedAccountId, amount });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updatedAccount = await withdrawService(parsedAccountId, amount)
        console.log("withdrawal result: ", updatedAccount);
        return res.status(200).send(updatedAccount)
    } catch (err) {
        const error = err as Error;
        console.error(err);
        return res.status(400).send({"Withdrawal failed": error.message})
    }
}

export async function deposit(req: Request, res: Response) {
    const { accountID } = req.params;
    const { amount } = req.body;
    const parsedAccountId = parseInt(accountID, 10);

    const { error } = transactionSchema.validate({ accountID: parsedAccountId, amount });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updatedAccount = await depositService(parsedAccountId, amount);
        console.log("deposit result: ", updatedAccount);
        return res.status(200).send(updatedAccount)
    } catch (err) {
        const error = err as Error;
        console.error(err);
        return res.status(400).send({"Deposit failed": error.message})
    }   
}

export default { withdraw, deposit };
