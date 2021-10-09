import React from "react";
import styles from "../Post.module.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comment from "@mui/icons-material/CommentOutlined";
import { red } from "@mui/material/colors";
import Comments from "../Comments/Comments";
import { NavLink } from "react-router-dom";
import { photoConstant, profileConstant } from "../../../../core/constants/constants";
import { useLocation, useHistory, useParams } from "react-router-dom";

const FooterPost = props => {
	let location = useLocation();
	let history = useHistory();
	let params = useParams();

	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckMyProfile = props.account && props.account.profile && !props.id;
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;
	let pos = location && location.search ? location.search.indexOf("=") : "";
	let idPost = location && location.search ? location.search.slice(pos + 1) : "";

	let checkCurrentPost =
		props.account && props.account.profile.posts
			? props.account.profile.posts.find(post => {
					if ((idPost && idPost === post.id) || (params && params.id === post.id)) {
						return post;
					}
			  })
			: undefined;

	return (
		<div className={props.modal ? styles.footer : styles.footer_modal}>
			{checkCurrentPost && checkCurrentPost.description && props.modal ? (
				<div className={props.modal ? styles.commentOwnerOfPost__modal : styles.commentOwnerOfPost}>
					<NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.account.id}`}>
						{oftenCheckMyProfile
							? props.account.profile.surname + " " + props.account.profile.name
							: oftenCheckOtherProfile
							? otherProfile.profile.surname + " " + otherProfile.profile.name
							: undefined}
					</NavLink>
					{checkCurrentPost.description ? checkCurrentPost.description : undefined}
				</div>
			) : undefined}

			<div className={styles.footer_head}>
				<div className={styles.features}>
					<div className={styles.features_left}>
						<Checkbox
							className={styles.icon}
							sx={{
								color: red[0],
								"&.Mui-checked": {
									color: red[600],
								},
							}}
							icon={<FavoriteBorder />}
							checkedIcon={<Favorite />}
						/>
						<Checkbox
							onClick={() => history.push(`${photoConstant}/${props.post.id}`)}
							className={styles.icon}
							color='default'
							size='medium'
							icon={<Comment />}
							checkedIcon={<Comment />}
						/>
						<Checkbox
							className={styles.icon}
							color='default'
							size='medium'
							icon={<ShareOutlinedIcon />}
							checkedIcon={<ShareOutlinedIcon />}
						/>
					</div>

					<div className={styles.features_right}>
						<Checkbox
							className={styles.icon}
							color='default'
							size='medium'
							icon={<BookmarkBorderIcon />}
							checkedIcon={<BookmarkIcon />}
						/>
					</div>
				</div>
				<div className={styles.numberOfLikes}>
					{props.post && props.post.likes && props.post.likes.length ? props.post.likes.length : 0} <span>likes</span>
				</div>
			</div>

			{props.post && props.post.description && !props.modal ? (
				<div className={styles.commentOwnerOfPost}>
					<NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.account.id}`}>
						{oftenCheckMyProfile
							? props.account.profile.surname + " " + props.account.profile.name
							: oftenCheckOtherProfile
							? otherProfile.profile.surname + " " + otherProfile.profile.name
							: undefined}
					</NavLink>
					{props.post.description ? props.post.description : undefined}
				</div>
			) : undefined}

			<Comments account={props.account} />
		</div>
	);
};

export default FooterPost;
