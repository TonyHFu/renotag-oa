import React from "react";

function RoomsListItem(props) {
	const { name, actions } = props;
	return (
		<div>
			{name}
			{actions.map(action => {
				return <div>{action.name}</div>;
			})}
		</div>
	);
}

export default RoomsListItem;
