import React from "react";
import RoomsListItem from "./RoomsListItem";

function RoomsList(props) {
	const { data, handleRoomSelection, currentRoom, setData } = props;
	return (
		<div style={{ paddingBottom: 200 }}>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
			<h2>Quotes</h2>
			{data.map(room => {
				return (
					<RoomsListItem
						key={room.id}
						id={room.id}
						name={room.name}
						actions={room.actions}
						currentRoom={currentRoom}
						handleRoomSelection={handleRoomSelection}
						setData={setData}
					></RoomsListItem>
				);
			})}
		</div>
	);
}

export default RoomsList;
