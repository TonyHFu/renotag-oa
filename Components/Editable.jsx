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
		const editedDoc = doc(db, collectionName, docId);
		Promise.all([
			addDoc(collection(db, collectionName), {
				...otherFields,
				[fieldName]: editedContent,
				updated: true,
				timestamp: serverTimestamp(),
			}),
			updateDoc(editedDoc, { updated: false }),
		]).then(res => {
			console.log("doc added!");
			setOpen(false);
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
				<p onClick={() => setClicked(true)}>{prefix + content + suffix}</p>
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
