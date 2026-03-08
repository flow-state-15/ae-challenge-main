import { Box, Paper, Typography } from "@mui/material";

import { RenderProps } from "../../types/AppTypes";

export default function Display({
	renderProps,
}: {
	renderProps: RenderProps;
}) {
	return (
		<Paper>
			<Box sx={displayStyles}>
				<Typography
					variant="h5"
					maxWidth="80%"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{renderProps.header1}
				</Typography>
				<Typography
					variant="h6"
					maxWidth="80%"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{renderProps.header2}
				</Typography>
				<Typography
					variant="h4"
					maxWidth="80%"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{renderProps.body}
				</Typography>
				<Box sx={selectStyles}>
					<Typography variant="body1">
						{renderProps.selectLeft}
					</Typography>
					<Typography variant="body1">
						{renderProps.selectCenter}
					</Typography>
					<Typography variant="body1">
						{renderProps.selectRight}
					</Typography>
				</Box>
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

const selectStyles = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: 2,
};
