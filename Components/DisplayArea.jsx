import React from "react";

function DisplayArea(props) {
	const { table, instance, sideNavData } = props;

	const materialId = sideNavData.materials.filter(
		material => material.name === instance
	)[0]?.id;

	const materialDetailsOverTime = sideNavData.materialDetails.filter(
		material => material.id === materialId
	);

	return (
		<div>
			<h3>{table}</h3>
			<h4>{instance}</h4>

			{table === "materials" && (
				<div>
					<p>
						Name:{" "}
						{
							// sideNavData.materials.filter(
							// 	material => material.name === instance
							// )[0].name
							instance
						}
					</p>
					<p>
						Price: ${" "}
						{
							sideNavData.materialDetails.filter(
								material => material.id === materialId
							)[0].price
						}
					</p>
				</div>
			)}
		</div>
	);
}

export default DisplayArea;
