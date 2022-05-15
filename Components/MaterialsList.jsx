import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import MaterialsListItem from "./MaterialsListItem";

function MaterialsList(props) {
	const { action, selectedAction, setSelectedAction } = props;

	return (
		<List>
			{action.id === selectedAction?.toString() &&
				action.materials.map(material => (
					<MaterialsListItem material={material}></MaterialsListItem>
				))}
		</List>
	);
}

export default MaterialsList;
