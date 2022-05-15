import { Button, Dialog, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

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
				if (!secondaryCollectionName) {
					setOpen(false);
					return window.location.reload(false);
				}

				// setData(prev => {
				// 	const copyOfPrev = [...prev];
				// 	const roomIndex = copyOfPrev.findIndex(
				// 		room => room.id === currentRoom
				// 	);
				// 	const actionIndex = copyOfPrev[roomIndex].actions.findIndex(
				// 		action => action.id === selectedAction
				// 	);
				// 	const materialIndex = copyOfPrev[roomIndex].actions[
				// 		actionIndex
				// 	].materials.findIndex(
				// 		eachMaterial => eachMaterial.material_id === material.material_id
				// 	);
				// 	copyOfPrev[roomIndex].actions[actionIndex].materials.splice(
				// 		materialIndex,
				// 		1
				// 	);
				// 	return copyOfPrev;
				// });

				return updateDoc(doc(db, secondaryCollectionName, secondaryDocId), {
					[secondaryIdPointer]: res[0].id,
					timestamp: serverTimestamp(),
				});
			})
			.then(res => {
				console.log("secondary doc added and updated!");
				setOpen(false);
				window.location.reload(false);
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
