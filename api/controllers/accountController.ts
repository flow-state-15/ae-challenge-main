import { Request, Response } from "express";
import Joi, { Schema } from "joi";
import { getAccountService } from "../services/accountService";

const getAccountSchema: Schema = Joi.object({
  accountID: Joi.number().positive().min(1).required(),
});

export async function getAccount(req: Request, res: Response) {
  const { accountID } = req.params;
  const parsedAccountId = parseInt(accountID, 10);

  const { error } = getAccountSchema.validate({ accountID: parsedAccountId });
  if (error) {
    return res.status(400).send("Invalid account ID");
  }

  try {
    const account = await getAccountService(parsedAccountId);
    return res.status(200).send(account);
  } catch (err) {
    const error = err as Error;
    console.error(err);
    return res.status(404).send({ "Account not found": error.message });
  }
}

export default { getAccount };
