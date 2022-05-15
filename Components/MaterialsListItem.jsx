import { ListItem, Typography } from "@mui/material";
import React from "react";

function MaterialsListItem(props) {
	const { material } = props;

	return (
		<ListItem
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<Typography>{material.name}</Typography>
			<Typography>Unit price: {material.price}</Typography>
			<Typography>
				{material.units !== "null" && "Units: " + material.units}
			</Typography>
		</ListItem>
	);
}

export default MaterialsListItem;
