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
	const [data, setData] = useState([]);

	const [currentRoom, setCurrentRoom] = useState(1);

	const roomsCollectionRef = collection(db, "rooms");
	const actionsCollectionRef = collection(db, "actions");
	const roomsActionsCollectionRef = collection(db, "rooms_actions");
	const materialsCollectionRef = collection(db, "materials");
	const actionsMaterialsCollectionRef = collection(db, "actions_materials");

	useEffect(() => {
		const roomsData = getDocs(roomsCollectionRef);
		const roomsActionsData = getDocs(roomsActionsCollectionRef);
		const actionsData = getDocs(actionsCollectionRef);
		const actionsMaterialsData = getDocs(actionsMaterialsCollectionRef);
		const materialsData = getDocs(materialsCollectionRef);

		Promise.all([
			roomsData,
			roomsActionsData,
			actionsData,
			actionsMaterialsData,
			materialsData,
		]).then(results => {
			const roomsArr = results[0].docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setRooms(roomsArr);
			const roomsActionsArr = results[1].docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setRoomsActions(roomsActionsArr);
			const actionsArr = results[2].docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setActions(actionsArr);
			const actionsMaterialsArr = results[3].docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setActionsMaterials(actionsMaterialsArr);
			const materialsArr = results[4].docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setMaterials(materialsArr);

			setData(
				roomsArr.map(room => {
					const possibleActions = roomsActionsArr
						.filter(
							roomsActions =>
								roomsActions.updated && roomsActions.room_id === room.id
						)
						.map(roomsActions => roomsActions.action_id);
					return {
						...room,
						actions: actionsArr
							.filter(action => possibleActions.includes(action.id))
							.map(action => {
								const possibleMaterials = actionsMaterialsArr
									.filter(
										actionsMaterials =>
											actionsMaterials.updated &&
											actionsMaterials.action_id === action.id
									)
									.map(actionsMaterials => actionsMaterials.material_id);
								return {
									...action,
									materials: materialsArr.filter(
										material =>
											material.updated &&
											possibleMaterials.includes(material.id)
									),
								};
							}),
					};
				})
			);
		});
	}, []);

	return (
		<div>
			<pre>{JSON.stringify(data)}</pre>
			{rooms.map(room => {
				return (
					<RoomsListItem
						key={room.id}
						id={room.id}
						name={room.name}
						actions={actions}
						currentRoom={currentRoom}
					></RoomsListItem>
				);
			})}
		</div>
	);
}

export default RoomsList;
