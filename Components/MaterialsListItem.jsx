import { Button, ListItem, Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { db } from "../firebase";
import Editable from "./Editable";
import { StatesContext } from "../pages/index";

function MaterialsListItem(props) {
	const { material, setData, currentRoom, selectedAction } = props;
	const states = useContext(StatesContext);

	const handleDelete = () => {
		const editedDoc = doc(
			db,
			"actions_materials",
			material.actions_materials_id
		);
		updateDoc(editedDoc, { updated: false }).then(res => {
			console.log("doc updated => false");

			states.setActionsMaterials(prev => {
				const copyOfPrev = [...prev];
				const actionsMaterialsIndex = copyOfPrev.findIndex(
					actionMaterial => actionMaterial.id === material.actions_materials_id
				);
				copyOfPrev[actionsMaterialsIndex].updated = false;
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
