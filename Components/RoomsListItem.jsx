import React from "react";

function RoomsListItem(props) {
	const { name, actions, id, currentRoom } = props;
	return (
		<div>
			{name}
			{currentRoom == id &&
				actions.map(action => {
					return <div>{action.name}</div>;
				})}
		</div>
	);
}

export default RoomsListItem;
