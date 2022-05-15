import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import MaterialsList from "./MaterialsList";

function ActionsListItem(props) {
	const { action, selectedAction, setSelectedAction, setData } = props;
	return (
		<ListItem
			style={{ display: "block" }}
			onClick={() => setSelectedAction(action.id)}
		>
			{action.name}
			<MaterialsList
				action={action}
				selectedAction={selectedAction}
				setSelectedAction={setSelectedAction}
				setData={setData}
			></MaterialsList>
		</ListItem>
	);
}

export default ActionsListItem;
