import { useQuery, useMutation } from "@tanstack/react-query";

import { queryClient } from "../../utils/appUtils";
import { Account } from "../../types/AppTypes";

export function useAccountQuery(accountId?: string) {
    return useQuery({
        queryFn: () => fetchAccount(accountId),
        queryKey: ["account"],
        enabled: !!accountId,
    });
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: (accountId: string) => fetchAccount(accountId),
        onSuccess: (data: Account) => {
            // queryClient.invalidateQueries({ queryKey: ["account"] });
			queryClient.setQueryData(['account'], data)
        },
        onError: (error: string) => {
			console.log("login error: ", error)
		},
    });
}

export function useDepositMutation(accountId: number, amount: number) {
    return useMutation({
        onSuccess: (data: Account) => {
            queryClient.setQueryData(["account"], data);
        },
        onError: (error) => {
            queryClient.setQueryData(["serverMessage", accountId], error.message);
        },
    });
}

export function useWithdrawMutation(accountId: number) {
    return useMutation({
        onSuccess: () => {},
        onError: () => {},
    });
}

export async function fetchAccount(accountId?: string) {
    if (!accountId) return;
    const response = await fetch(`http://localhost:3000/accounts/${accountId || ""}`);
    const data = await response.json();
    return data;
}
