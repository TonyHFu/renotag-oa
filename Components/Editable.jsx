import React, { useState } from "react";

function Editable(props) {
	const [clicked, setClicked] = useState(false);

	const { prefix, suffix, content } = props;
	return (
		<>
			{clicked && (
				<>
					<label htmlFor="editable">{prefix}</label>
					<input type={typeof content} value={content} name="editable"></input>
				</>
			)}
			{!clicked && (
				<p onClick={() => setClicked(true)}>{prefix + content + suffix}</p>
			)}
		</>
	);
}

export default Editable;
