import { Box } from "@mui/material";

import Machine from "../features/atm/Machine";

export default function App() {
    return (
        <Box sx={appStyles}>
            <Machine />
        </Box>
    );
}

const appStyles = {
    border: "10px dashed orange",
    margin: "auto",
    width: "100%",
    height: "100%",
};
