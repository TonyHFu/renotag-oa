import { ListItem, Typography } from "@mui/material";
import React from "react";
import Editable from "./Editable";

function MaterialsListItem(props) {
	const { material } = props;

	return (
		<ListItem
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<Editable
				prefix=""
				suffix=""
				content={material.name}
				otherFields={{
					price: material.price,
				}}
				collectionName={"materials"}
				fieldName={"name"}
				docId={material.id}
			></Editable>
			<Editable
				prefix="Unit Price: $"
				suffix=""
				content={material.price}
				otherFields={{
					name: material.name,
				}}
				collectionName={"materials"}
				fieldName={"price"}
				docId={material.id}
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
			></Editable>
		</ListItem>
	);
}

export default MaterialsListItem;
