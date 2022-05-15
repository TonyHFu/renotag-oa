import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import ActionsListItem from "./ActionsListItem";

function ActionsList(props) {
	const { actions, selectedAction, setSelectedAction, setData } = props;
	return (
		<List>
			{actions.map(action => {
				return (
					<ActionsListItem
						key={action.id}
						action={action}
						selectedAction={selectedAction}
						setSelectedAction={setSelectedAction}
						setData={setData}
					></ActionsListItem>
				);
			})}
		</List>
	);
}

export default ActionsList;
