import { useReducer } from "react";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import Display from "./Display";
import Keypad from "./Keypad";
import { Account, InputActions, Screen } from "../../types/AppTypes";
import { initialMachineState, machineReducer, deriveRenderProps } from "./machineState";
import { accountQueryKey, fetchAccount, fetchDeposit, fetchWithdraw } from "./machineQueries";

export default function Machine() {
    const queryClient = useQueryClient();
    const [state, dispatch] = useReducer(machineReducer, initialMachineState);
    const account = queryClient.getQueryData<Account>(accountQueryKey);
    const renderProps = deriveRenderProps(state, account);

    const handleSelectLeft = () => {
        if (state.screen === Screen.Menu) {
            dispatch({ type: Screen.Deposit, payload: "" });
        }

        if (state.screen === Screen.Deposit) {
            dispatch({ type: Screen.Menu, payload: "" });
        }
    };

    const handleSelectRight = () => {
        if (state.screen === Screen.Menu) {
            return dispatch({ type: Screen.Withdraw, payload: "" });
        }

        if (state.screen === Screen.Withdraw) {
            // cancels withdraw
            return dispatch({ type: Screen.Menu, payload: "" });
        }
    };

    const handleSelectLogout = () => {
        if (state.screen === Screen.LoggedOut) return;

        queryClient.removeQueries({ queryKey: accountQueryKey });
        dispatch({ type: Screen.LoggedOut, payload: "" });
    };

    const handleClear = () => {
        dispatch({ type: InputActions.SetInput, payload: "" });
    };

    const handleEnter = async () => {
        if (!state.input) return;
        if (state.screen === Screen.LoggedOut) {
            try {
                await queryClient.fetchQuery({
                    queryKey: accountQueryKey,
                    queryFn: () => fetchAccount(state.input),
                });
                return dispatch({ type: Screen.Menu, payload: "" });
            } catch (e) {
                const error = e as Error;
                return dispatch({
                    type: InputActions.SetInput,
                    payload: error.message,
                });
            }
        }

        if (!account || !account.account_number) return;

        if (state.screen === Screen.Deposit) {
            try {
                await queryClient.fetchQuery({
                    queryKey: accountQueryKey,
                    queryFn: () => fetchDeposit(account.account_number, state.input),
                });
                return dispatch({ type: Screen.Menu, payload: "" });
            } catch (e) {
                const error = e as Error;
                return dispatch({ type: InputActions.SetInput, payload: error.message });
            }
        }

        if (state.screen === Screen.Withdraw) {
            try {
                await queryClient.fetchQuery({
                    queryKey: accountQueryKey,
                    queryFn: () => fetchWithdraw(account.account_number, state.input),
                });
                dispatch({ type: Screen.Menu, payload: "" });
            } catch (e) {
                const error = e as Error;
                dispatch({ type: InputActions.SetInput, payload: error.message });
            }
        }
    };

    const handleNumber = (number: string) => {
        if (
            state.screen === Screen.LoggedOut ||
            state.screen === Screen.Deposit ||
            state.screen === Screen.Withdraw
        ) {
            dispatch({ type: InputActions.AppendInput, payload: number });
        }
    };

    return (
        <Box sx={machineStyles}>
            <Display renderProps={renderProps} />
            <Keypad
                onLeft={handleSelectLeft}
                onRight={handleSelectRight}
                onCenter={handleSelectLogout}
                onClear={handleClear}
                onEnter={handleEnter}
                onNumber={handleNumber}
            />
        </Box>
    );
}

const machineStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgb(205, 208, 215, 0.5)",
    margin: "auto",
    minWidth: 400,
    maxWidth: { xs: "90%", sm: "75%", md: 600 },
    marginTop: 15,
    padding: 3,
    gap: 2,
};
