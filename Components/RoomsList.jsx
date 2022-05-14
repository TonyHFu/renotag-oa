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

function RoomsList() {
	const [rooms, setRooms] = useState([]);
	const [actions, setActions] = useState([]);
	const [materials, setMaterials] = useState([]);
	const [roomsActions, setRoomsActions] = useState([]);
	const [actionsMaterials, setActionsMaterials] = useState([]);

	const [currentRoom, setCurrentRoom] = useState(1);

	const roomsCollectionRef = collection(db, "rooms");
	const actionsCollectionRef = collection(db, "actions");
	const roomsActionsCollectionRef = collection(db, "rooms_actions");
	const materialsCollectionRef = collection(db, "materials");
	const actionsMaterialsCollectionRef = collection(db, "actions_materials");

	useEffect(() => {
		const getRooms = async () => {
			const data = await getDocs(roomsCollectionRef);
			setRooms(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};

		const getActions = async () => {
			const q = query(
				roomsActionsCollectionRef,
				where("room_id", "==", currentRoom)
			);
			const roomsActionsQuery = await getDocs(q);
			setRoomsActions(
				roomsActionsQuery.docs.map(doc => ({ ...doc.data(), id: doc.id }))
			);
			const actionsData = await getDocs(actionsCollectionRef);
			setActions(actionsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};

		getRooms();
		if (currentRoom) getActions();
	}, []);

	return (
		<div>
			{rooms.map(room => {
				return (
					<RoomsListItem
						key={room.id}
						name={room.name}
						actions={actions}
					></RoomsListItem>
				);
			})}
		</div>
	);
}

export default RoomsList;
