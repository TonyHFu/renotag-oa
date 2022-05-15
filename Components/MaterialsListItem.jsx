import { ListItem, Typography } from "@mui/material";
import React from "react";
import Editable from "./Editable";

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
			<Editable prefix="" suffix="" content={material.name}></Editable>
			<Editable
				prefix="Unit Price: $"
				suffix=""
				content={material.price}
			></Editable>
			<Editable prefix="Units: " suffix="" content={material.units}></Editable>
		</ListItem>
	);
}

export default MaterialsListItem;
