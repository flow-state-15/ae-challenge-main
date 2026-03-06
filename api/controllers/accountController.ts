import { Request, Response } from "express";
import { getAccountService } from "../services/accountService";
import { validateAccountID } from "../utils/validations";

export async function getAccount(req: Request, res: Response) {
  const { accountID } = req.params;
  const validatedAccountID = validateAccountID(accountID);

  try {
    const account = await getAccountService(validatedAccountID);
    return res.status(200).send(account);
  } catch (err) {
    const error = err as Error;
    console.error(err);
    return res.status(404).send({ "Account not found": error.message });
  }
}

export default { getAccount };
