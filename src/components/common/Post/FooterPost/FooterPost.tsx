import React from "react";
import { AccountType, CommentType, FirebaseType, HistoryType, LikedOfPostType, PostType, ReplyType, SavedOfPostType } from "../../../../types/types";
import { pahtOfWebsiteConstant, photoConstant } from "../../../../core/constants/constants";
import { CommentIllustration } from "../../../../assets/illustrations/CommentIllustration";
import { heyFriendStyleConstant } from "../../../../core/constants/constantsStyles";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Comment from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CustomAvatar from "../../../atoms/Avatar/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Favorite from "@mui/icons-material/Favorite";
import FooterPostReduxForm from "./FooterPostForm";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Comments from "../Comments/Comments";
import { red } from "@mui/material/colors";
import { fb } from "../../../../firebase";
import styles from "../Post.module.scss";
import { Global } from "@emotion/react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Media from "react-media";

interface FooterPostPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  currentAccount: FirebaseType<AccountType> | undefined;
  comments: Array<FirebaseType<CommentType>>;
  post: FirebaseType<PostType> | undefined;
  replies: Array<FirebaseType<ReplyType>>;
  checkClickFavoriteBorder: LikedOfPostType | undefined;
  history: HistoryType;
  modal: boolean;
  createCommentThunk: (comment: CommentType) => void;
  createReplyThunk: (reply: ReplyType) => void;
  updatePostThunk: (post: PostType) => void;
  updateCommentThunk: (comment: CommentType) => void;
  updateReplyThunk: (reply: ReplyType) => void;
  deleteCommentThunk: (comment: CommentType) => void;
  deleteReplyThunk: (reply: ReplyType) => void;
}

export interface FooterPostFormDataType extends Array<any> {
  comment: string;
}

const Puller = styled(Box)(({ theme }) => ({}));

const FooterPost = (props: FooterPostPropsType) => {
  const [open, setOpen] = React.useState(false);
  const [replyOfComment, setReplyOfComment] = React.useState<CommentType | null>(null);
  const [answerComment, setAnswerComment] = React.useState<CommentType | null>(null);
  const container = window !== undefined ? () => window.document.body : undefined;
  const isPathOfPost = "/" + props.history.location.pathname.split("/")[1] === photoConstant.path;

  const onSubmit = (formData: FooterPostFormDataType) => {
    !replyOfComment
      ? props.createCommentThunk({
          id: "",
          accountId: props?.account?.id,
          postId: props?.post?.id,
          comment: formData.comment,
          dateCreated: fb.Timestamp.now(),
        })
      : props.createReplyThunk({
          id: "",
          accountId: replyOfComment.accountId,
          commentId: replyOfComment.id,
          dateCreated: fb.Timestamp.now(),
          reply: formData.comment,
        });

    setReplyOfComment(null);
    Object.keys(formData).map((item: any) => (formData[item] = ""));
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const checkClickBookmarkIcon: SavedOfPostType | undefined = props?.post?.data()?.saved ? props?.post?.data()?.saved?.find((saved: SavedOfPostType) => (saved?.id && props?.account?.id && saved?.id === props?.account?.id ? saved : undefined)) : undefined;

  // are there any comments length of post
  const areComments: Array<FirebaseType<CommentType>> = props.comments?.filter((comment: FirebaseType<CommentType>) => (comment?.data()?.postId === props?.post?.id ? comment : undefined)).sort((a: FirebaseType<CommentType>, b: FirebaseType<CommentType>) => b?.data()?.dateCreated.toDate().getTime() - a?.data()?.dateCreated.toDate().getTime());

  // destructuring props
  const destPropsComments = { accounts: props.accounts, account: props.account, currentAccount: props.currentAccount, comments: props.comments, replies: props.replies, post: props.post, modal: props.modal, history: props.history, isPathOfPost, replyOfComment, answerComment, areComments, toggleDrawer, setReplyOfComment, setAnswerComment, deleteCommentThunk: props.deleteCommentThunk, updateCommentThunk: props.updateCommentThunk, updateReplyThunk: props.updateReplyThunk, deleteReplyThunk: props.deleteReplyThunk };
  const destPropsFooterPostReduxForm = { replyOfComment, answerComment, setReplyOfComment, onSubmit: onSubmit, createReplyThunk: props.createReplyThunk, updateCommentThunk: props.updateCommentThunk };

  return (
    <div className={props.modal ? styles.footer : styles.footer_modal}>
      {props.modal && <Comments {...destPropsComments} />}

      <div className={styles.footer_head}>
        <div className={styles.features}>
          <div className={styles.features_left}>
            <Checkbox onClick={() => (!props.checkClickFavoriteBorder ? props?.post && props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? [...(props?.post?.data()?.liked as Array<any>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.post && props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? props?.post?.data()?.liked?.filter((liked: LikedOfPostType) => liked?.id !== props?.account?.id) : [] }))} className={styles.icon} color="default" icon={!props.checkClickFavoriteBorder ? <FavoriteBorder /> : <Favorite sx={{ color: red[600] }} />} checkedIcon={props.checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} /> : <FavoriteBorder />} />
            <Checkbox onClick={() => props.history.push(`${photoConstant.path}/${props?.post?.id}`)} className={styles.icon} color="default" size="medium" icon={<Comment />} checkedIcon={<Comment />} />
            <Button className={styles.icon} style={{ minWidth: "unset", borderRadius: "50%" }} color="inherit" size="small" variant={undefined} href={`https://telegram.me/share/url?url=${`${pahtOfWebsiteConstant}/${photoConstant.path}/${props?.post?.data().id}`}`} target="_blank" rel="noopener noreferrer">
              <ShareOutlinedIcon />
            </Button>
          </div>

          <div className={styles.features_right}>
            <Checkbox className={styles.icon} onClick={() => (!checkClickBookmarkIcon ? props?.post && props?.updatePostThunk({ ...props?.post?.data(), saved: props?.post?.data()?.saved ? [...(props?.post?.data()?.saved as Array<any>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.post && props?.updatePostThunk({ ...props?.post?.data(), saved: props?.post?.data()?.saved ? props?.post?.data()?.saved?.filter((saved: SavedOfPostType) => saved?.id !== props?.account?.id) : [] }))} color="default" size="medium" icon={!checkClickBookmarkIcon ? <BookmarkBorderIcon /> : <BookmarkIcon />} checkedIcon={checkClickBookmarkIcon ? <BookmarkIcon /> : <BookmarkBorderIcon />} />
          </div>
        </div>
        <div className={styles.numberOfLikes}>
          <AvatarGroup className={styles.likes_avatar_group} max={4}>
            {props?.accounts ? props?.accounts?.map((account: FirebaseType<AccountType>) => props?.post?.data()?.liked?.map((liked: LikedOfPostType) => (account.id === liked.id ? <CustomAvatar avatarData={account?.data()} /> : undefined))) : undefined}
          </AvatarGroup>
          <span>
            {!props?.post?.data()?.liked || props?.post?.data()?.liked?.length === 0 ? 0 : undefined} {(props?.post?.data()?.liked?.length as number) > 1 ? "likes" : "like"}
          </span>
        </div>
      </div>

      {!props.modal ? (
        isPathOfPost ? (
          <Media query={{ maxWidth: 720 }}>
            {(matches) =>
              matches && (
                <div className={styles.footer_comments}>
                  <Global styles={{ ".MuiDrawer-root > .MuiPaper-root": { height: `80%`, overflow: "visible", borderRadius: "10px 10px 0 0" } }} />
                  <Button color="secondary" variant="outlined" onClick={toggleDrawer(true)}>
                    <ExpandLessIcon />
                  </Button>
                  <SwipeableDrawer container={container} anchor="bottom" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} swipeAreaWidth={undefined} disableSwipeToOpen={true} ModalProps={{ keepMounted: true }}>
                    <div className={styles.footer_drawer_content}>
                      <Puller className={styles.footer_drawer__puller} />
                      <Typography className={styles.footer_drawer__title}>Comments</Typography>
                      <div className={styles.footer_comments_content}>{areComments.length > 0 ? <Comments {...destPropsComments} /> : <CommentIllustration height="100%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />}</div>

                      <div className={styles.footer_comments_form}>
                        <FooterPostReduxForm {...destPropsFooterPostReduxForm} />
                      </div>
                    </div>
                  </SwipeableDrawer>
                </div>
              )
            }
          </Media>
        ) : (
          <>
            <Comments {...destPropsComments} />
            <FooterPostReduxForm {...destPropsFooterPostReduxForm} />
          </>
        )
      ) : (
        <FooterPostReduxForm {...destPropsFooterPostReduxForm} />
      )}
    </div>
  );
};

export default FooterPost;
