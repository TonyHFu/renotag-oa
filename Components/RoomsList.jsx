import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import RoomsListItem from "./RoomsListItem";

function RoomsList(props) {
	const { data, handleRoomSelection, currentRoom } = props;
	return (
		<div>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
			{data.map(room => {
				return (
					<RoomsListItem
						key={room.id}
						id={room.id}
						name={room.name}
						actions={room.actions}
						currentRoom={currentRoom}
						handleRoomSelection={handleRoomSelection}
					></RoomsListItem>
				);
			})}
		</div>
	);
}

export default RoomsList;
