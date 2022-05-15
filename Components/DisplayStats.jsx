import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import DisplayArea from "./DisplayArea";
import SideNav from "./SideNav";

const tables = ["rooms", "actions", "materials"];

function DisplayStats(props) {
	const { sideNavData } = props;

	const [table, setTable] = useState("rooms");
	const [instance, setInstance] = useState(sideNavData[table][0]?.name || null);

	useEffect(() => {}, []);
	return (
		<>
			<h2>Preferences</h2>
			{/* <pre>{JSON.stringify(sideNavData, null, 2)}</pre> */}
			<div id="preferences">
				<SideNav
					tables={tables}
					setTable={setTable}
					table={table}
					sideNavData={sideNavData}
					setInstance={setInstance}
				></SideNav>
				<DisplayArea
					table={table}
					instance={instance}
					sideNavData={sideNavData}
				></DisplayArea>
			</div>
		</>
	);
}

export default DisplayStats;
