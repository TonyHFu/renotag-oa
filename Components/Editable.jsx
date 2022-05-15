import { Button, Dialog, DialogTitle } from "@mui/material";
import React, { useState } from "react";

function Editable(props) {
	const { prefix, suffix, content } = props;
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

	const handleUpdate = () => {};

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
