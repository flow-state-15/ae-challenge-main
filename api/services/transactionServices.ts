/*
This service engages db Atomicity and Isolation

Note: when we deposit, we credit system and debit user accounts, withdrawals are inverted.
Credits are outflows (negative) and debits are inflows (positive). Intent is to
implement double entry bookkeeping. From the firm's perspective it's a transfer - money
is always moved, not created or destroyed.

I'm keeping service errors colocated with queries for better visibility and debugging.
User facing errors are thrown in the controller.
*/

import { pool } from "../utils/db";

export async function depositService(accountId: number, amount: number) {
  const client = await pool.connect();
  try {
    // creating atomic transaction
    await client.query("BEGIN");

    // ledger entry first
    const transaction = await client.query(
      `INSERT INTO transactions (from_account, to_account, type, amount)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [0, accountId, "deposit", amount],
    );

    if (transaction.rowCount === 0) {
      throw new Error("Transaction failed");
    }

    // then update balances
    const userAccount = await client.query(
      `UPDATE accounts SET amount = amount + $1
        WHERE account_number = $2
        RETURNING *`,
      [amount, accountId],
    );
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

    const transaction = await client.query(
      `INSERT INTO transactions (from_account, to_account, type, amount)
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
      [accountId, 0, "withdrawal", amount],
    );

    if (transaction.rowCount === 0) {
      throw new Error("Transaction failed");
    }

    const userAccount = await client.query(
      `UPDATE accounts SET amount = amount - $1
          WHERE account_number = $2
          RETURNING *`,
      [amount, accountId],
    );
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
