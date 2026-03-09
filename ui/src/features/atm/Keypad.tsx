import { Box, Button, Typography, Paper } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Keypad({
    onLeft,
	onRight,
	onCenter,
    onClear,
    onEnter,
    onNumber,
}: {
    onLeft: () => void;
    onRight: () => void;
    onCenter: () => void;
    onClear: () => void;
    onEnter: () => void;
    onNumber: (number: string) => void;
}) {
    return (
        <Box sx={keypadStyles}>
            <Button 
				variant="contained" 
				sx={buttonStyles} 
				onClick={() => onLeft()}
			>
                <KeyboardArrowUpIcon fontSize="large" />
            </Button>
            <Button 
				variant="contained" 
				sx={buttonStyles} 
				onClick={() => onCenter()}
			>
                <KeyboardArrowUpIcon fontSize="large" />
            </Button>
            <Button 
				variant="contained" 
				sx={buttonStyles} 
				onClick={() => onRight()}
			>
                <KeyboardArrowUpIcon fontSize="large" />
            </Button>
            {Array(9)
                .fill(null)
                .map((_, i) => (
                    <Box key={i}>
                        <KeypadNumberButton onNumber={onNumber}>{i + 1}</KeypadNumberButton>
                    </Box>
                ))}
            <Button 
				variant="contained" 
				sx={buttonStyles} 
				onClick={() => onClear()}
			>
                Clear
            </Button>
            <Button 
				variant="contained" 
				sx={buttonStyles} 
				onClick={() => onNumber("0")}
			>
                0
            </Button>
            <Button 
				variant="contained" 
				sx={buttonStyles} 
				onClick={() => onEnter()}
			>
                Enter
            </Button>
        </Box>
    );
}

function KeypadNumberButton({
    children,
    onNumber,
}: {
    children: number;
    onNumber: (number: string) => void;
}) {
    return (
        <Button
            fullWidth
            variant="contained"
            sx={buttonStyles}
            onClick={() => onNumber(children.toString())}
        >
            {children}
        </Button>
    );
}

const keypadStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 1.5,
};

const buttonStyles = {
    width: "100%",
    height: "5rem",
    fontSize: "1.2rem",
    backgroundColor: "rgb(205, 208, 215, 0.5)",
    color: "black",
	'&:hover': { backgroundColor: "silver" }
};
