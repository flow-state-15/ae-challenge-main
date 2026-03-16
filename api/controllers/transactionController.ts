import { Request, Response } from "express";

import {
	depositService,
	getDailyWithdrawalTotalService,
	getTransactions,
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

		return res.status(200).send(updatedAccount);
	} catch (err) {
		const error = err as Error;
		console.error(err);
		return res.status(400).send({message: error.message});
	}
}

export async function transactionHistory(req: Request, res: Response) {
	const { accountID } = req.params;

	try {
		const validId = validateAccountID(accountID);

		// begin db calls
		const result = await getTransactions(validId);
		console.log("controller res: ", result)
		return res.send(result)
	} catch (e) {
		const error = e as Error;
		return res.status(422).send({ message: error.message })
	}
}

export default { withdraw, deposit, transactionHistory };
