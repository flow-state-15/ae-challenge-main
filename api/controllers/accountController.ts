import { Request, Response } from "express";
import Joi, { Schema } from "joi";
import { getAccountService } from "../services/accountService";

const getAccountSchema: Schema = Joi.string().required();

export async function getAccount(req: Request, res: Response) {
    const { accountID } = req.params;
    const { error } = getAccountSchema.validate(req.params.accountID);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const account = await getAccountService(accountID);
        return res.status(200).send(account);
    } catch (err) {
        const error = err as Error;
        console.error(err);
        return res.status(404).send({"Account not found": error.message});
    }
}

export default { getAccount };
