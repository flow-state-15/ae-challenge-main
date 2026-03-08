import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Display from "./Display";
import Keypad from "./Keypad";

export default function Machine() {
    const [displayHeader, setDisplayHeader] = useState("");
    const [displayBody, setDisplayBody] = useState("");
    const [currentInput, setCurrentInput] = useState("");

    const handleButtonClick = (input: string) => {
		setCurrentInput((prev) => prev + input);
	}

    return (
        <Box sx={machineStyles}>
            <Display displayHeader={displayHeader} displayBody={displayBody} />
            <Keypad handleButtonClick={handleButtonClick} />
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
