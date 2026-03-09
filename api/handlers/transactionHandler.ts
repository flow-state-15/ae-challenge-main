// archived file for contrast with service

import { query } from "../utils/db";
import { getAccount } from "./accountHandler";

/*
These handlers invite race conditions at scale.
If multiple updates hit account at same time, some of them will update
with stale data if we derive new state in the api. Let the db queue
the requests, enforce isolation and safely handle concurrency.
*/

export const withdrawal = async (accountID: string, amount: number) => {
  const account = await getAccount(accountID);
  account.amount -= amount;
  const res = await query(`
    UPDATE accounts
    SET amount = $1 
    WHERE account_number = $2`,
    [account.amount, accountID]
  );

  if (res.rowCount === 0) {
    throw new Error("Transaction failed");
  }

  return account;
}

export const deposit = async (accountID: string, amount: number) => {
  const account = await getAccount(accountID);
  account.amount += amount;
  const res = await query(`
    UPDATE accounts
    SET amount = $1 
    WHERE account_number = $2`,
    [account.amount, accountID]
  );

  if (res.rowCount === 0) {
    throw new Error("Transaction failed");
  }

  return account;
}