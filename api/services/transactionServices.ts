/*
This service engages db Atomicity and Isolation
*/

import { pool } from "../utils/db";

export async function withdrawService(accountId: string, amount: number) {
  /*
    If we do the math in sql the db will lock the row during the update,
    keeping a race condition from happening if multiple requests are trying
    to update this account at the same time. Sql will lock the row and queue the requests.
    This enforces Isolation.
    */
  const account = await pool.query(`
    UPDATE accounts
    SET amount = amount - $1
    WHERE account_number = $2
    RETURNING *`,
    [amount, accountId]
  );

  if (account.rowCount === 0) {
    throw new Error("Error withdrawing funds");
  }

  return account.rows[0];
}

export async function depositService(accountId: string, amount: number) {
  // db enforces isolation by locking the row during the update
  const account = await pool.query(`
    UPDATE accounts
    SET amount = amount + $1
    WHERE account_number = $2
    RETURNING *`,
    [amount, accountId],
  );
  console.log("depositService, account: ", account);
  if (account.rowCount === 0) {
    throw new Error("Error depositing funds");
  }

  return account.rows[0];
}

// atomizing a multi query transaction
export async function transferService(
  fromAccountId: string,
  toAccountId: string,
  amount: number,
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const fromAccount = await client.query(``, [amount, fromAccountId]);
    const toAccount = await client.query(``, [amount, toAccountId]);

    console.log("fromAccount: ", fromAccount);
    console.log("toAccount: ", toAccount);

    //TODO: throw if account updates fail so we can rollback

    await client.query("COMMIT");
    return { fromAccount, toAccount };
  } catch (err) {
    // all or nothing
    await client.query("ROLLBACK");
    throw new Error("Failed to transfer funds");
  } finally {
    client.release();
  }
}
