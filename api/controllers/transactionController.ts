import { Request, Response } from "express";
import Joi, { Schema } from "joi";
import { depositService, withdrawService } from "../services/transactionServices";

const transactionSchema: Schema = Joi.object({
    amount: Joi.number().required(),
});

export async function withdraw(req: Request, res: Response) {
    const { accountID } = req.params;
    const { amount } = req.body;
    const { error } = transactionSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updatedAccount = await withdrawService(accountID, amount)
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
    const { error } = transactionSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updatedAccount = await depositService(accountID, amount);
        return res.status(200).send(updatedAccount)
    } catch (err) {
        const error = err as Error;
        console.error(err);
        return res.status(400).send({"Deposit failed": error.message})
    }   
}

export default { withdraw, deposit };
