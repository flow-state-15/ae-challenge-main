import Joi from "joi";
import { Account } from "../types";

/*
Project validation constraints:
- Account ID must be a positive number
- Amount must be a positive number
- Deposit amount up to 1000 for non-credit accounts
- Deposit up to zero for credit accounts
- Withdraw amount is divisible by 5
- Withdraw amount up to 200 in a single transaction
- Withdraw amount up to 400 in a single day
- Withdraw up to account balance for non-credit accounts
- Withdraw up to account credit limit for credit accounts

We throw in validations to keep controller clean and better error DX
*/

export function validateAccountID(accountID: string) {
	const { error, value } = Joi.number().positive().min(1).required().validate(accountID);
	if (error) {
		throw new Error("INVALID_ACCOUNT_ID");
	}
	return value;
}

export function validateAmount(amount: number) {
	const { error, value } = Joi.number().positive().min(1).required().validate(amount);
	if (error) {
		throw new Error("INVALID_AMOUNT");
	}
	return value;
}

export function validateWithdrawRequestSync(amount: number) {
	/*
	- Withdraw amount up to 200 in a single transaction
	- Withdraw amount is divisible by 5
	*/
	if (amount > 200) {
		throw new Error("Withdrawal limit exceeded.");
	}
	if (amount % 5 !== 0) {
		throw new Error("Withdrawals must be in increments of $5.");
	}
	return true;
}

// STATEFUL validations ----------------------------

export function validateDepositRequestDB(amount: number, account: Account): true {
	/*
	- Deposit amount up to 1000 for non-credit accounts
	- Deposit up to zero for credit accounts
	*/
	if (account.type !== "credit" && amount > 1000) {
		throw new Error("Deposit limit exceeded.");
	}
	if (account.type === "credit" && amount > Math.abs(account.amount)) {
		throw new Error("Deposit limit exceeded.");
	}
	return true;
}

export function validateWithdrawalRequestDB(
	amount: number,
	account: Account,
	currentWithdraws: number,
): true {
	/*
	- Withdraw amount up to 400 in a single day
	- Withdraw up to account balance for non-credit accounts
	- Withdraw up to account credit limit for credit accounts
	*/
	if (amount + currentWithdraws > 400) {
		throw new Error("Cannot withdraw more than $400 in 24 hours.");
	}
	if (account.type !== "credit" && amount > account.amount) {
		throw new Error("Cannot withdraw more than account balance.");
	}
	if (account.type === "credit" && amount + Math.abs(account.amount) > account.credit_limit) {
		throw new Error("Cannot withdraw more than credit limit.");
	}
	return true;
}
