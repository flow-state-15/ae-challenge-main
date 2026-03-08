import { Box, Button, Typography, Paper } from "@mui/material";

export default function Keypad({
    handleButtonClick,
}: {
    handleButtonClick: (body: string) => void;
}) {
    return (
        <Box sx={keypadStyles}>
            <Button variant="contained" sx={buttonStyles}>
                Cancel
            </Button>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">Advisors</Typography>
                <Typography variant="h6">Excel</Typography>
            </Box>
            <Button variant="contained" sx={buttonStyles}>
                Log Out
            </Button>
            {Array(9)
                .fill(null)
                .map((_, i) => (
                    <Box key={i}>
                        <KeypadNumberButton handleButtonClick={handleButtonClick}>
                            {i + 1}
                        </KeypadNumberButton>
                    </Box>
                ))}
            <Button variant="contained" sx={buttonStyles}>
                Clear
            </Button>
            <Button variant="contained" sx={buttonStyles}>
                0
            </Button>
            <Button variant="contained" sx={buttonStyles}>
                Enter
            </Button>
        </Box>
    );
}

function KeypadNumberButton({
    children,
    handleButtonClick,
}: {
    children: number;
    handleButtonClick: (body: string) => void;
}) {
    return (
        <Button
            fullWidth
            variant="contained"
            sx={buttonStyles}
            onClick={() => handleButtonClick(children.toString())}
        >
            {children}
        </Button>
    );
}

const keypadStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 1.3,
};

const buttonStyles = {
    width: "100%",
    height: "5rem",
    fontSize: "1.2rem",
    backgroundColor: "rgb(205, 208, 215, 0.5)",
    color: "black",
};
