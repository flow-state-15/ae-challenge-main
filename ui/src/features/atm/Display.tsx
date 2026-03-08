import { Box, Paper, Typography } from "@mui/material";

export default function Display({
	displayHeader,
	displayBody,
}: {
	displayHeader: string;
	displayBody: string;
}) {
	return (
		<Paper>
			<Box sx={displayStyles}>
				<Typography
					variant="h6"
					maxWidth="80%"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{displayHeader}
				</Typography>
				<Typography
					variant="h6"
					maxWidth="80%"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{displayBody}
				</Typography>
			</Box>
		</Paper>
	);
}

const displayStyles = {
	padding: 2,
	minHeight: "10rem",
	fontSize: "1.2rem",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "center",
	gap: 2,
};
