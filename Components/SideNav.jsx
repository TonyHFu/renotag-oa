import React from "react";
import SubNav from "./SubNav";

function SideNav(props) {
	const { tables, setTable, table, sideNavData, setInstance } = props;

	return (
		<div id="preferences-side" style={{}}>
			{tables.map(eachTable => (
				<div>
					<p
						onClick={() => {
							setTable(eachTable);
							setInstance(sideNavData[eachTable][0].name);
						}}
					>
						{eachTable}
					</p>
					{table === eachTable && (
						<SubNav
							sideNavData={sideNavData}
							table={table}
							setInstance={setInstance}
						></SubNav>
					)}
				</div>
			))}
		</div>
	);
}

export default SideNav;
