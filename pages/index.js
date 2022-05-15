import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { createContext, useEffect, useState } from "react";
import DisplayStats from "../Components/DisplayStats";
import RoomsList from "../Components/RoomsList";
import { db } from "../firebase";
import styles from "../styles/Home.module.css";

export const StatesContext = createContext();

export default function Home() {
	const [rooms, setRooms] = useState([]);
	const [actions, setActions] = useState([]);
	const [materials, setMaterials] = useState([]);
	const [roomsActions, setRoomsActions] = useState([]);
	const [actionsMaterials, setActionsMaterials] = useState([]);
	const [materialDetails, setMaterialDetails] = useState([]);
	const [data, setData] = useState([]);

	const [currentRoom, setCurrentRoom] = useState(1);

	const roomsCollectionRef = collection(db, "rooms");
	const actionsCollectionRef = collection(db, "actions");
	const roomsActionsCollectionRef = collection(db, "rooms_actions");
	const materialsCollectionRef = collection(db, "materials");
	const materialDetailsCollectionRef = collection(db, "material_details");
	const actionsMaterialsCollectionRef = collection(db, "actions_materials");

	const handleRoomSelection = id => {
		setCurrentRoom(id);
	};

	useEffect(() => {
		const roomsData = getDocs(roomsCollectionRef);
		const roomsActionsData = getDocs(roomsActionsCollectionRef);
		const actionsData = getDocs(actionsCollectionRef);
		const actionsMaterialsData = getDocs(actionsMaterialsCollectionRef);
		const materialsData = getDocs(materialsCollectionRef);
		const materialDetailsData = getDocs(materialDetailsCollectionRef);

		Promise.all([
			roomsData,
			roomsActionsData,
			actionsData,
			actionsMaterialsData,
			materialsData,
			materialDetailsData,
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
			const materialDetailsArr = results[5].docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setMaterialDetails(materialDetailsArr);
		});

		// setData(
		// 	roomsArr.map(room => {
		// 		const possibleActions = roomsActionsArr
		// 			.filter(
		// 				roomsActions =>
		// 					roomsActions.updated && roomsActions.room_id === room.id
		// 			)
		// 			.map(roomsActions => roomsActions.action_id);
		// 		return {
		// 			...room,
		// 			actions: actionsArr
		// 				.filter(action => possibleActions.includes(action.id))
		// 				.map(action => {
		// 					return {
		// 						...action,

		// 						materials: actionsMaterialsArr
		// 							.filter(
		// 								actionsMaterials =>
		// 									actionsMaterials.updated &&
		// 									actionsMaterials.action_id === action.id
		// 							)
		// 							.map(material => {
		// 								const { name, material_details_id } = materialsArr.filter(
		// 									materialFromArr =>
		// 										material.material_id === materialFromArr.id
		// 								)[0];
		// 								const { price, id } = materialDetailsArr.filter(
		// 									materialDetailsFromArr =>
		// 										materialDetailsFromArr.updated &&
		// 										material.material_id ===
		// 											materialDetailsFromArr.material_id
		// 								)[0];

		// 								return {
		// 									actions_materials_id: material.id,
		// 									material_id: material.material_id,
		// 									action_id: material.action_id,
		// 									name,
		// 									price,
		// 									units: material.units,
		// 									// timestamp: material.timestamp,
		// 									// updated: material.updated,
		// 									material_details_id,
		// 								};
		// 							}),
		// 					};
		// 				}),
		// 		};
		// 	})
		// );
	}, []);

	useEffect(() => {
		setData(
			rooms.map(room => {
				const possibleActions = roomsActions
					.filter(
						roomsAction =>
							roomsAction.updated && roomsAction.room_id === room.id
					)
					.map(roomsAction => roomsAction.action_id);
				return {
					...room,
					actions: actions
						.filter(action => possibleActions.includes(action.id))
						.map(action => {
							return {
								...action,

								materials: actionsMaterials
									.filter(
										actionsMaterial =>
											actionsMaterial.updated &&
											actionsMaterial.action_id === action.id
									)
									.map(material => {
										const { name, material_details_id } = materials.filter(
											materialFromArr =>
												material.material_id === materialFromArr.id
										)[0];
										const { price, id } = materialDetails.filter(
											materialDetailsFromArr =>
												materialDetailsFromArr.updated &&
												material.material_id ===
													materialDetailsFromArr.material_id
										)[0];

										return {
											actions_materials_id: material.id,
											material_id: material.material_id,
											action_id: material.action_id,
											name,
											price,
											units: material.units,
											// timestamp: material.timestamp,
											// updated: material.updated,
											material_details_id,
										};
									}),
							};
						}),
				};
			})
		);
	}, [rooms, actions, materials, roomsActions, actionsMaterials]);

	const sideNavData = {
		rooms,
		roomsActions,
		actions,
		actionsMaterials,
		materials,
		materialDetails,
	};

	const states = {
		rooms,
		roomsActions,
		actions,
		actionsMaterials,
		materials,
		materialDetails,
		setRooms,
		setRoomsActions,
		setActions,
		setActionsMaterials,
		setMaterials,
		setMaterialDetails,
	};
	return (
		<div className={styles.container}>
			<pre>{JSON.stringify(states.actionsMaterials, null, 2)}</pre>
			<StatesContext.Provider value={states}>
				<DisplayStats sideNavData={sideNavData}></DisplayStats>
				<RoomsList
					data={data}
					handleRoomSelection={handleRoomSelection}
					currentRoom={currentRoom}
					setData={setData}
					rooms={rooms}
					roomsActions={roomsActions}
					actions={actions}
					actionsMaterials={actionsMaterials}
					materialDetails={materialDetails}
					materials={materials}
				></RoomsList>
			</StatesContext.Provider>
		</div>
	);
}
