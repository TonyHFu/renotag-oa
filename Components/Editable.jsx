import { Button, Dialog, DialogTitle } from "@mui/material";
import React, { useContext, useState } from "react";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import { StatesContext } from "../pages/index";

function Editable(props) {
	const {
		prefix,
		suffix,
		content,
		otherFields,
		collectionName,
		fieldName,
		docId,
		secondaryDocId,
		secondaryCollectionName,
		secondaryFields,
		secondaryIdPointer,
		setData,
	} = props;

	const states = useContext(StatesContext);

	const [clicked, setClicked] = useState(false);
	const [editedContent, setEditedContent] = useState(content);
	const [open, setOpen] = useState(false);

	const handleChange = e => {
		setEditedContent(e.target.value);
	};

	const handleFocusOut = e => {
		setOpen(true);
		setClicked(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdate = () => {
		//Note: currently does not update data state, only the displayed state. refresh will draw in new data
		const editedDoc = doc(db, collectionName, docId);
		let newDocId;
		Promise.all([
			addDoc(collection(db, collectionName), {
				...otherFields,
				[fieldName]: editedContent,
				updated: true,
				timestamp: serverTimestamp(),
			}),
			updateDoc(editedDoc, { updated: false }),
		])
			.then(res => {
				console.log("doc added and updated!!");
				newDocId = res[0].id;

				if (collectionName === "material_details") {
					states.setMaterialDetails(prev => {
						const copyOfPrev = [...prev];
						const detailsIndex = copyOfPrev.findIndex(
							detail => detail.id === docId
						);
						copyOfPrev[detailsIndex].updated = false;

						return [
							...copyOfPrev,
							{
								...otherFields,
								id: newDocId,
								[fieldName]: editedContent,
								updated: true,
								timestamp: serverTimestamp(),
							},
						];
					});
				}

				if (collectionName === "actions_materials") {
					states.setActionsMaterials(prev => {
						const copyOfPrev = [...prev];
						const materialsIndex = copyOfPrev.findIndex(
							material => material.id === docId
						);
						copyOfPrev[materialsIndex].updated = false;

						return [
							...copyOfPrev,
							{
								...otherFields,
								id: newDocId,
								[fieldName]: editedContent,
								updated: true,
								timestamp: serverTimestamp(),
							},
						];
					});
				}
				if (!secondaryCollectionName) {
					return setOpen(false);
				}

				return updateDoc(doc(db, secondaryCollectionName, secondaryDocId), {
					[secondaryIdPointer]: newDocId,
					timestamp: serverTimestamp(),
				});
			})
			.then(res => {
				console.log("secondary doc added and updated!");
				setOpen(false);

				if (secondaryCollectionName === "materials") {
					states.setMaterials(prev => {
						const copyOfPrev = [...prev];
						const materialsIndex = copyOfPrev.findIndex(
							material => material.id === secondaryDocId
						);
						copyOfPrev[materialsIndex].material_details_id = newDocId;
						return copyOfPrev;
					});
				}
			});
	};

	return (
		<>
			{clicked && (
				<>
					<label htmlFor="editable">{prefix}</label>
					<input
						autoFocus
						onBlur={handleFocusOut}
						type={typeof content}
						value={editedContent}
						name="editable"
						onChange={handleChange}
					></input>
				</>
			)}
			{!clicked && (
				<p onClick={() => setClicked(true)}>
					{prefix + editedContent + suffix}
				</p>
			)}

			<Dialog open={open}>
				<DialogTitle>Would you like to update your preferences?</DialogTitle>
				<Button onClick={handleUpdate}>Yes</Button>
				<Button onClick={handleClose}>No</Button>
			</Dialog>
		</>
	);
}

export default Editable;
