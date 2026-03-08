import { useState, useReducer } from "react";
import { Box, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import Display from "./Display";
import Keypad from "./Keypad";
import { InputActions, Screen } from "../../types/AppTypes";
import { initialMachineState, machineReducer, deriveRenderProps } from "./machineState";
import { fetchAccount, useLoginMutation, useAccountQuery } from "./machineQueries";
import { queryClient } from "../../utils/appUtils";

export default function Machine() {
	const queryClient = useQueryClient();
	console.log(queryClient)
    const [state, dispatch] = useReducer(machineReducer, initialMachineState);
	const { data: account,  } = useAccountQuery(1)asasasa
	const { mutate: login } = useLoginMutation();
	// console.log("login mutation: ", mutation)
    
	const renderProps = deriveRenderProps(state, account);
	console.log("renderProps", renderProps);
    // on logout these functions will do nothing
    // if there's not render props for the selection button, there shoud be no function loaded into state
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

        // TODO: call logout query
        dispatch({ type: Screen.LoggedOut, payload: "" });
    };

    const handleClear = () => {
        dispatch({ type: InputActions.SetInput, payload: "" });
    };

    const handleEnter = () => {
		// maybe call a settimeout to go back to menu on success
		// errors get displayed and no screen change. only input change
		if (state.screen === Screen.LoggedOut) {
			// on success
			// TODO: call login query with current input state
			const result = login(state.input)
			const success = state.input === "1234567890";
			if (success) {
				return dispatch({ type: Screen.Menu, payload: "" })
			}

			if (!success) {
				return dispatch({ type: InputActions.SetInput, payload: "Error Logging in" })
			}
		}

        if (state.screen === Screen.Deposit) {
            // TODO: call deposit query with current input state
			// TODO: on error dispatch server message
			const result = "testing server"

			if (false) {
				return dispatch({type: InputActions.SetInput, payload: result})
			}
			// success response
            return dispatch({ type: Screen.Menu, payload: "" });
        }

        if (state.screen === Screen.Withdraw) {
            //TODO: call withdraw query with current input state
            return dispatch({ type: InputActions.SetInput, payload: "" });
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
