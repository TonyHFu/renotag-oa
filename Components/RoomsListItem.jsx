import React, { useState } from "react";
import { Card, List, ListItem } from "@mui/material";

function RoomsListItem(props) {
	const { name, actions, id, currentRoom, handleRoomSelection } = props;
	const [selectedAction, setSelectedAction] = useState(null);

	return (
		<Card variant="outlined" onClick={() => handleRoomSelection(id)}>
			{name}
			{currentRoom == id && (
				<List>
					{actions.map(action => {
						return (
							<ListItem
								style={{ display: "block" }}
								onClick={() => setSelectedAction(action.id)}
							>
								{action.name}
								<List>
									{action.id === selectedAction?.toString() &&
										action.materials.map(material => (
											<ListItem>{material.name}</ListItem>
										))}
								</List>
							</ListItem>
						);
					})}
				</List>
			)}
		</Card>
	);
}

export default RoomsListItem;
