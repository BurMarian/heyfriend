import React from "react";
import styles from "./Stories.module.css";
import Story from "./Story/Story";

const Stories = props => {
	return (
		<div className={styles.stories}>
			<div className={styles.title}>Stories</div>
			<Story profile={props.profile} profileAuthorizationData={props.profileAuthorizationData} />
		</div>
	);
};

export default Stories;
