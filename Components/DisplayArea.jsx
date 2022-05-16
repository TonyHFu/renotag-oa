import React from "react";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

function DisplayArea(props) {
	const { table, instance, sideNavData } = props;

	const materialId = sideNavData.materials.filter(
		material => material.name === instance
	)[0]?.id;

	const materialDetailsTime = sideNavData.materialDetails
		.filter(material => material.material_id === materialId)
		.map(material => material.timestamp.toDate());
	const materialDetailsPrice = sideNavData.materialDetails
		.filter(material => material.material_id === materialId)
		.map(material => Number(material.price));

	const materialDetailsData = sideNavData.materialDetails
		.filter(material => material.material_id === materialId)
		.map(material => ({
			x: material.timestamp.toDate(),
			y: Number(material.price),
		}))
		.sort((a, b) => {
			// console.log(a.x - b.x);
			return a.x - b.x;
		});

	return (
		<div style={{ paddingLeft: 50 }}>
			<h3>{table}</h3>
			<h4>{instance}</h4>

			{table === "materials" && (
				<div>
					<p>Name: {instance}</p>
					<p>
						Price: ${" "}
						{
							sideNavData.materialDetails.filter(
								material => material.id === materialId
							)[0]?.price
						}
					</p>
					{/* <pre>{JSON.stringify(sideNavData, null, 2)}</pre> */}
					{/* <pre>{JSON.stringify(materialDetailsTime, null, 2)}</pre> */}
					<Line
						height={400}
						width={600}
						options={{
							scales: {
								x: {
									type: "time",
									time: {
										unit: "hour",
									},
								},
							},
						}}
						data={{
							datasets: [
								{
									label: "Unit Price",
									fill: true,
									borderColor: "#742774",
									data: materialDetailsData,
								},
							],
						}}
					></Line>
				</div>
			)}
		</div>
	);
}

export default DisplayArea;
