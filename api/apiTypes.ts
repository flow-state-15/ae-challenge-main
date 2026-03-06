import { Account } from "../globalTypes";

export type WithdrawRequest = {
  amount: number;
  account: Account;
};

export type DepositRequest = {
  amount: number;
  account: Account;
};

export type ValidatedTransaction = {
  validatedAmount: number;
  validatedAccountID: number;
}