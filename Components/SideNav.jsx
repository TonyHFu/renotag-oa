import React from "react";
import SubNav from "./SubNav";

function SideNav(props) {
	const { tables, setTable, table, sideNavData } = props;

	return (
		<div id="preferences-side" style={{}}>
			{tables.map(eachTable => (
				<div onClick={() => setTable(eachTable)}>
					{eachTable}
					{table === eachTable && (
						<SubNav sideNavData={sideNavData} table={table}></SubNav>
					)}
				</div>
			))}
		</div>
	);
}

export default SideNav;
