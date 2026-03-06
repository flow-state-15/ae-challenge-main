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
