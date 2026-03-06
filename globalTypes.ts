// global types prevent frontend/backend drift

export type Account = {
  account_number: number;
  name: string;
  amount: number;
  type: "checking" | "savings" | "credit" | "system";
  credit_limit: number;
};

export type Transaction = {
  transaction_id: number;
  from_account: number;
  to_account: number;
  amount: number;
  type: "deposit" | "withdrawal";
  created_at: string;
};

// ERROR TYPES -----------------------------------

export type TransactionValidationError = Error & {
  message: "INVALID_TRANSACTION_REQUEST" | "INSUFFICIENT_FUNDS" | "DAILY_LIMIT_EXCEEDED" | "WITHDRAWAL_LIMIT_EXCEEDED" | "DEPOSIT_LIMIT_EXCEEDED" | "WITHDRAWALS_MUST_BE_INCREMENTS_OF_5";
}

export type TransactionError = Error & {
  message: "TRANSACTION_FAILED" | "UPDATE_FAILED";
};

export type AccountValidationError = Error & {
  message: "ACCOUNT_NOT_FOUND";
};