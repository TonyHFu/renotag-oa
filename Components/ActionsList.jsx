import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import ActionsListItem from "./ActionsListItem";

function ActionsList(props) {
	const { actions, selectedAction, setSelectedAction } = props;
	return (
		<List>
			{actions.map(action => {
				return (
					<ActionsListItem
						action={action}
						selectedAction={selectedAction}
						setSelectedAction={setSelectedAction}
					></ActionsListItem>
				);
			})}
		</List>
	);
}

export default ActionsList;
