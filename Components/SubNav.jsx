import React from "react";

function SubNav(props) {
	const { sideNavData, table, setInstance } = props;

	const subNavList = sideNavData[table];

	return (
		<div style={{ paddingLeft: 5 }}>
			{subNavList.map(subNavListItem => {
				return (
					<p onClick={() => setInstance(subNavListItem.name)}>
						{subNavListItem.name}
					</p>
				);
			})}
		</div>
	);
}

export default SubNav;
