import React from "react";

function SubNav(props) {
	const { sideNavData, table } = props;

	const subNavList = sideNavData[table];

	return (
		<div style={{ paddingLeft: 5 }}>
			{subNavList.map(subNavListItem => {
				return <p>{subNavListItem.name}</p>;
			})}
		</div>
	);
}

export default SubNav;
