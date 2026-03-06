import { pool } from "../utils/db";
import { Account, AccountValidationError } from "../../globalTypes";

export async function getAccountService(accountId: number): Promise<Account> {
	// prettier-ignore
	const account = await pool.query(
		`SELECT account_number, name, amount, type, credit_limit 
    	FROM accounts 
    	WHERE account_number = $1`,
		[accountId],
	);

	if (account.rowCount === 0) {
		throw new Error("ACCOUNT_NOT_FOUND");
	}

	return account.rows[0] as Account;
}
