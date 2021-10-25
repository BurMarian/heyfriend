import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import dialogStyles from "../../components/Chat/Dialogs/Dialog/Dialog.module.css";
import styles from "./helperForChat.module.css";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../core/constants/constants";

export const Head = props => {
	let id = Number(props.match.params.id);
	let otherProfile = props.accounts ? props.accounts.find(profile => (id ? profile.id === id : undefined)) : undefined;

	return props.toggleShowContent ? (
		<div className={styles.head}>
			<div>{props.account.profile.surname + " " + props.account.profile.name}</div>
		</div>
	) : (
		<div className={styles.head + " " + styles.head_messages}>
			<div>
				{props.users.map(user => {
					if (user && id && user.id === id) {
						return (
							<NavLink
								key={user.id}
								to={props.account && props.account.id !== id ? `${profileConstant}/` + user.id : `${profileConstant}`}
								className={dialogStyles.chat_forHead}>
								<div className={dialogStyles.wrapper_picture}>
									<div className={dialogStyles.have_not_picture_forHead}>
										{user ? (
											<img src={otherProfile && otherProfile.profile.img ? otherProfile.profile.img : defaultAvatar} alt='' />
										) : (
											<></>
										)}
									</div>
								</div>
								<div>
									<div className={dialogStyles.login}>{user ? user.surname + " " + user.name : <></>}</div>
								</div>
							</NavLink>
						);
					}
				})}
			</div>
			<div>
				<FontAwesomeIcon
					onClick={() => (props.toggleDetails ? props.setToggleDetails(false) : props.setToggleDetails(true))}
					className={styles.icon}
					icon={faInfoCircle}
				/>
			</div>
		</div>
	);
};
