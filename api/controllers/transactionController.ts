import { Request, Response } from "express";

import {
	depositService,
	getDailyWithdrawalTotalService,
	withdrawService,
} from "../services/transactionServices";
import {
	validateAccountID,
	validateAmount,
	validateWithdrawalRequestDB,
	validateWithdrawRequestSync,
	validateDepositRequestDB,
} from "../utils/validations";
import { getAccountService } from "../services/accountService";

export async function withdraw(req: Request, res: Response) {
	const { accountID } = req.params;
	const { amount } = req.body;

	try {
		const validatedAccountID = validateAccountID(accountID);
		const validatedAmount = validateAmount(amount);
		validateWithdrawRequestSync(validatedAmount);

		// begin db calls
		const account = await getAccountService(validatedAccountID);
		const dailyWithdraws = await getDailyWithdrawalTotalService(validatedAccountID);
		validateWithdrawalRequestDB(validatedAmount, account, dailyWithdraws);

		const updatedAccount = await withdrawService(validatedAccountID, validatedAmount);

		console.log("withdrawal result: ", updatedAccount);
		return res.status(200).send(updatedAccount);
	} catch (err) {
		const error = err as Error;
		console.error(err);
		return res.status(400).send({ message: error.message });
	}
}

export async function deposit(req: Request, res: Response) {
	const { accountID } = req.params;
	const { amount } = req.body;

	try {
		const validatedAccountID = validateAccountID(accountID);
		const validatedAmount = validateAmount(amount);

		// begin db calls
		const account = await getAccountService(validatedAccountID);
		validateDepositRequestDB(validatedAmount, account);

		const updatedAccount = await depositService(validatedAccountID, validatedAmount);

		console.log("deposit result: ", updatedAccount);
		return res.status(200).send(updatedAccount);
	} catch (err) {
		const error = err as Error;
		console.error(err);
		return res.status(400).send({message: error.message});
	}
}

export default { withdraw, deposit };
