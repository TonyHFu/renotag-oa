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
