import React, { useState } from "react";
import { Card, List, ListItem, Typography } from "@mui/material";

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
													{material.units !== "null" &&
														"Units: " + material.units}
												</Typography>
											</ListItem>
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
