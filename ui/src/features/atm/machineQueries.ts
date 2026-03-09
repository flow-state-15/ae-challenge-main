import { Account } from "../../types/AppTypes";

export const accountQueryKey = ["account"] as const;

export async function fetchAccount(accountId: string): Promise<Account> {
    const response = await fetch(`http://localhost:3000/accounts/${accountId}`);
    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export async function fetchDeposit(accountId: number, amount: string) {
    const response = await fetch(`http://localhost:3000/transactions/${accountId}/deposit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
    });
    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export async function fetchWithdraw(accountId: number, amount: string) {
    const response = await fetch(`http://localhost:3000/transactions/${accountId}/withdraw`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
    });
    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}
