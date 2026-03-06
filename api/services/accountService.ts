import { pool } from "../utils/db";

export async function getAccountService(accountId: number) {
  const account = await pool.query(
    `SELECT account_number, name, amount, type, credit_limit 
    FROM accounts 
    WHERE account_number = $1`,
    [accountId],
  );

  if (account.rowCount === 0) {
    throw new Error("Account not found");
  }

  return account.rows[0];
}
