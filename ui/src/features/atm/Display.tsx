import { Box, Paper, Typography } from "@mui/material";

import { RenderProps } from "../../types/AppTypes";

export default function Display({ renderProps }: { renderProps: RenderProps }) {
    return (
        <Paper>
            <Box sx={displayStyles}>
                <Box sx={headerStyles}>
                    <Typography
                        variant="h6"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        {renderProps.header1}
                    </Typography>
                    <Typography
                        variant="body1"
                        overflow="wrap"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        {renderProps.header2}
                    </Typography>
                </Box>
                <Typography
                    variant="h5"
                    overflow="wrap"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                >
                    {renderProps.body}
                </Typography>
                <Box sx={selectStyles}>
                    <Typography variant="h6">{renderProps.selectLeft}</Typography>
                    <Typography variant="h6">{renderProps.selectCenter}</Typography>
                    <Typography variant="h6">{renderProps.selectRight}</Typography>
                </Box>
            </Box>
        </Paper>
    );
}

const displayStyles = {
    minHeight: "14rem",
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
};

const headerStyles = {
    width: "100%",
    maxHeight: "40%",
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 1,
};

const selectStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 1.5,
    width: "100%",
    textAlign: "center",
};
