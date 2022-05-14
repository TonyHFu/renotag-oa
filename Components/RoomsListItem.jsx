import React, { useState } from "react";

function RoomsListItem(props) {
	const { name, actions, id, currentRoom } = props;
	const [selectedAction, setSelectedAction] = useState(null);

	return (
		<div>
			{name}
			{currentRoom == id &&
				actions.map(action => {
					return (
						<div>
							{action.name}
							{action.id === selectedAction &&
								action.materials.map(material => <div>{material.name}</div>)}
						</div>
					);
				})}
		</div>
	);
}

export default RoomsListItem;
