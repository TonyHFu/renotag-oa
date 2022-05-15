import React, { useState } from "react";
import { Card, List, ListItem, Typography } from "@mui/material";
import ActionsList from "./ActionsList";

function RoomsListItem(props) {
	const { name, actions, id, currentRoom, handleRoomSelection } = props;
	const [selectedAction, setSelectedAction] = useState(null);

	return (
		<Card variant="outlined" onClick={() => handleRoomSelection(id)}>
			{name}
			{currentRoom == id && (
				<ActionsList
					actions={actions}
					selectedAction={selectedAction}
					setSelectedAction={setSelectedAction}
				></ActionsList>
			)}
		</Card>
	);
}

export default RoomsListItem;
