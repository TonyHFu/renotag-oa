import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import MaterialsListItem from "./MaterialsListItem";

function MaterialsList(props) {
	const { action, selectedAction, setSelectedAction, setData, currentRoom } =
		props;

	return (
		<List>
			{action.id === selectedAction?.toString() &&
				action.materials.map(material => (
					<MaterialsListItem
						material={material}
						key={material.material_id}
						setData={setData}
						currentRoom={currentRoom}
						selectedAction={selectedAction}
					></MaterialsListItem>
				))}
		</List>
	);
}

export default MaterialsList;
