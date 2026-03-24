-- CREATE TABLE
DROP TABLE IF EXISTS accounts, transactions;
CREATE TABLE accounts (
    account_number INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    credit_limit INTEGER,
	account_tier VARCHAR NOT NULL DEFAULT 'system'
);

/*
transactions table is the bank's ledger of all transactions (movement of money).
balances are derived from transactions table during an audit, and it allows double entry bookkeeping. Seeding -90,000 zeros the ledger at app instantiation.

the system account represents the bank's liabilities.
Note: since the system account is always the other side of the transaction,
we've created a hot row that is frequently locked and will be a bottleneck at scale. IRL load is distributed across internal firm accounts.
*/

-- TODO: every transaction needs a unique id from the client to protect against client retries after commit.
-- TODO: not handling cents or validating, we're using integers.
CREATE TABLE transactions (
    transaction_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    from_account INTEGER NOT NULL REFERENCES accounts(account_number),
    to_account INTEGER NOT NULL REFERENCES accounts(account_number),
    type VARCHAR NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
    amount INTEGER NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE accounts ADD CONSTRAINT verify_type
CHECK (type IN ('checking', 'savings', 'credit', 'system'));

-- LOAD DATAS
INSERT INTO accounts
    (account_number, name, amount, type)
VALUES
    (0, 'System', -90000, 'system'),
    (1, 'Johns Checking', 1000, 'checking'),
    (2, 'Janes Savings', 2000, 'savings'),
    (4, 'Bobs Checking', 40000, 'checking'),
    (5, 'Bills Savings', 50000, 'savings'),
    (7, 'Nancy Checking', 70000, 'checking'),
    (8, 'Nancy Savings', 80000, 'savings');

INSERT INTO accounts
    (account_number, name, amount, type, credit_limit)
VALUES
    (3, 'Jills Credit', -3000, 'credit', 10000),
    (6, 'Bills Credit', -60000, 'credit', 60000),
    (9, 'Nancy Credit', -90000, 'credit', 100000);

/*
validating some application constraints in sql for performance reasons.
network latency is higher than cpu cycle time, so I try to avoid
sending back large result arrays from db to api if possible.
*/
-- FUNCTIONS
CREATE OR REPLACE FUNCTION total_user_withdrawals_24hr(account_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
	total INTEGER;
BEGIN
	SELECT SUM(amount) INTO total
	FROM transactions
	WHERE from_account = account_id
		AND created_at >= NOW() - INTERVAL '24 hours'
		AND type = 'withdrawal';
	-- NULL result returns 0 for better DX
	RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;
