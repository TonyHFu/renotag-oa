import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";

const tables = ["rooms", "actions", "materials"];

function DisplayStats(props) {
	const { sideNavData } = props;

	const [table, setTable] = useState("rooms");
	const [instance, setInstance] = useState(sideNavData[table][0].name);

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
				<h3>{table}</h3>
				<h4>{instance}</h4>
			</div>
		</>
	);
}

export default DisplayStats;
