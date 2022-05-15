import { Button, ListItem, Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";
import Editable from "./Editable";

function MaterialsListItem(props) {
	const { material, setData, currentRoom, selectedAction } = props;

	const handleDelete = () => {
		const editedDoc = doc(
			db,
			"actions_materials",
			material.actions_materials_id
		);
		updateDoc(editedDoc, { updated: false }).then(res => {
			console.log("doc updated => false");
			setData(prev => {
				const copyOfPrev = [...prev];
				const roomIndex = copyOfPrev.findIndex(room => room.id === currentRoom);
				const actionIndex = copyOfPrev[roomIndex].actions.findIndex(
					action => action.id === selectedAction
				);
				const materialIndex = copyOfPrev[roomIndex].actions[
					actionIndex
				].materials.findIndex(
					eachMaterial => eachMaterial.material_id === material.material_id
				);
				copyOfPrev[roomIndex].actions[actionIndex].materials.splice(
					materialIndex,
					1
				);
				return copyOfPrev;
			});
		});
	};

	return (
		<ListItem
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<p>{material.name}</p>
			<Editable
				prefix="Unit Price: $"
				suffix=""
				content={material.price}
				otherFields={{
					material_id: material.material_id,
				}}
				collectionName={"material_details"}
				fieldName={"price"}
				docId={material.material_details_id}
				secondaryDocId={material.material_id}
				secondaryCollectionName={"materials"}
				secondaryFields={{
					name: material.name,
				}}
				secondaryIdPointer="material_details_id"
				setData={setData}
			></Editable>
			<Editable
				prefix="Units: "
				suffix=""
				content={material.units}
				otherFields={{
					action_id: material.action_id,
					material_id: material.material_id,
				}}
				collectionName={"actions_materials"}
				fieldName={"units"}
				docId={material.actions_materials_id}
				setData={setData}
			></Editable>
			<Button onClick={handleDelete} variant="outlined">
				Delete
			</Button>
		</ListItem>
	);
}

export default MaterialsListItem;
