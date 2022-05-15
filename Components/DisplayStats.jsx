import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";

const tables = ["rooms", "actions", "materials"];

function DisplayStats(props) {
	const { sideNavData } = props;

	const [table, setTable] = useState("rooms");

	useEffect(() => {}, []);
	return (
		<>
			<h2>Preferences</h2>
			<div id="preferences">
				<SideNav
					tables={tables}
					setTable={setTable}
					table={table}
					sideNavData={sideNavData}
				></SideNav>
				<h3>{table}</h3>
			</div>
		</>
	);
}

export default DisplayStats;
