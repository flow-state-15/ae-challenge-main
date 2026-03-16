/*
This service engages db Atomicity and Isolation

Note: when we deposit, we credit system and debit user accounts, withdrawals are inverted.
Credits are outflows (negative) and debits are inflows (positive). Intent is to
implement double entry bookkeeping. From the firm's perspective it's a transfer - money is always moved, not created or destroyed.

I'm keeping service errors colocated with queries for better visibility and DX.
User facing errors are thrown in validations.
*/

import { pool } from "../utils/db";

export async function depositService(accountId: number, amount: number) {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");

		// prettier-ignore
		const transaction = await client.query(
			`INSERT INTO transactions (from_account, to_account, type, amount)
			VALUES ($1, $2, $3, $4)
			RETURNING *`,
			[0, accountId, "deposit", amount],
		);

		if (transaction.rowCount === 0) {
			throw new Error("Transaction failed");
		}

		// prettier-ignore
		const userAccount = await client.query(
			`UPDATE accounts SET amount = amount + $1
			WHERE account_number = $2
			RETURNING *`,
			[amount, accountId],
		);
		// prettier-ignore
		const systemAccount = await client.query(
			`UPDATE accounts SET amount = amount - $1
			WHERE account_number = $2
			RETURNING *`,
			[amount, 0],
		);

		if (userAccount.rowCount === 0 || systemAccount.rowCount === 0) {
			throw new Error("Update failed");
		}

		await client.query("COMMIT");
		return userAccount.rows[0];
	} catch (err) {
		console.error(err);
		await client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
}

export async function withdrawService(accountId: number, amount: number) {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		// prettier-ignore
		const transaction = await client.query(
			`INSERT INTO transactions (from_account, to_account, type, amount)
			VALUES ($1, $2, $3, $4)
			RETURNING *`,
			[accountId, 0, "withdrawal", amount],
		);

		if (transaction.rowCount === 0) {
			throw new Error("Transaction failed");
		}

		// prettier-ignore
		const userAccount = await client.query(
			`UPDATE accounts SET amount = amount - $1
			WHERE account_number = $2
			RETURNING *`,
			[amount, accountId],
		);
		// prettier-ignore
		const systemAccount = await client.query(
			`UPDATE accounts SET amount = amount + $1
			WHERE account_number = $2
			RETURNING *`,
			[amount, 0],
		);

		if (userAccount.rowCount === 0 || systemAccount.rowCount === 0) {
			throw new Error("Update failed");
		}

		await client.query("COMMIT");
		return userAccount.rows[0];
	} catch (err) {
		console.error(err);
		await client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
}

export async function getDailyWithdrawalTotalService(accountId: number): Promise<number> {
	// prettier-ignore
	const result = await pool.query(
			`SELECT total_user_withdrawals_24hr($1)`,
			[accountId]
		)

	return result.rows[0].total_user_withdrawals_24hr;
}

export async function getTransactions(accountId: number) {
	const result = await pool.query(`SELECT * FROM transaction_history($1)`, [accountId]);
	console.log("getTransactions: ", result)
	return result.rows[0]
}