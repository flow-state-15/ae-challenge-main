import { useState, useReducer } from "react";
import { Box, Typography } from "@mui/material";

import Display from "./Display";
import Keypad from "./Keypad";
import { RenderProps, Screen } from "../../types/AppTypes";
import { initialMachineState, machineReducer, deriveRenderProps } from "./machineState";

export default function Machine() {
    const [state, dispatch] = useReducer(machineReducer, initialMachineState);
    const [renderProps, setRenderProps] = useState<RenderProps>();

	// on logout these functions will do nothing
	// if there's not render props for the selection button, there shoud be no function loaded into state
    handleSelectLeft = (select: string) => {
		// depending on screen, dispatches deposit or cancel, or does nothing
		if (state.screen === Screen.Menu) {
			dispatch({ type: "DEPOSIT" });
		} else if (state.screen === Screen.Deposit) {
			dispatch({ type: "CANCEL" });
		}
	};

	handleSelectRight = (select: string) => {
		// depending on screen, dispatches withdrawl or cancel, or does nothing
	};

	handleSelectCenter = (select: string) => {
		// depending on screen, calls logout or does nothing
	};

    handleClear = (clear: string) => {};

    handleEnter = (enter: string) => {};

    handleNumber = (number: string) => {};

    return (
        <Box sx={machineStyles}>
            <Display renderProps={renderProps} />
            <Keypad
                onSelect={handleSelect}
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
