import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../../types/types";
import { Skeleton, Tooltip, Chip, ListItemText, Typography, ListItem, ListItemAvatar } from "@mui/material";
import { getTextOfStatusOnline } from "../../../../core/methods/methods";
import CustomAvatarBadge from "../../../atoms/AvatarBadge/AvatarBadge";
import CustomAvatarGroup from "../../../atoms/AvatarGroup/AvatarGroup";
import { chatConstant } from "../../../../core/constants/constants";
import { NavLink } from "react-router-dom";
import styles from "./Dialog.module.scss";
import moment from "moment";

interface DialogPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chat: FirebaseType<ChatType>;
  messages: Array<FirebaseType<MessageType>>;
  getSearchedGroups: Array<FirebaseType<ChatType>>;
  loading: boolean;
  messageValue: string;
  searchValue: string;
  chatWithAccounts: Array<FirebaseType<AccountType>>;
  currentChatsOfAccount: Array<FirebaseType<ChatType>>;
}

const Dialog = (props: DialogPropsType) => {
  const messageWithAccounts: Array<FirebaseType<AccountType>> = props?.accounts?.filter((account: FirebaseType<AccountType>) => (props?.chat?.data()?.participants ? props?.chat?.data()?.participants?.find((participants: ParticipantsOfChatType) => account?.id === participants?.id && account?.id !== props?.account?.id) : undefined));
  const lengthChatOfAccounts = messageWithAccounts.length < 2;
  const currentMessages: Array<FirebaseType<MessageType>> = props?.messages?.length > 0 ? props?.messages?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime())?.filter((message: FirebaseType<MessageType>) => message?.data()?.chatId === props?.chat?.id) : [];

  const lastLoginAt = lengthChatOfAccounts && messageWithAccounts[0]?.data()?.metadata?.lastSignInTime?.toDate();
  const isOnline = lengthChatOfAccounts && Boolean(messageWithAccounts[0]?.data()?.isOnline);
  const lastMessage = currentMessages[currentMessages?.length - 1]?.data()?.message;
  const checkMessage = currentMessages?.length > 0 && lastMessage !== "" && (lastMessage?.length < 20 ? lastMessage : lastMessage?.slice(0, 20) + "...");

  // get group from searching
  const getSearchedGroup: FirebaseType<ChatType> | undefined = props.searchValue ? props.getSearchedGroups.find((chat: FirebaseType<ChatType>) => chat.id === props.chat.id) : undefined;

  return (
    <NavLink to={!props.loading ? `${chatConstant.path}/` + props?.chat?.data()?.id : "#"} className={styles.chat + " " + styles.chat_forHead} activeClassName={`${!props.loading && styles.chat_active}`}>
      <ListItem
        classes={{
          root: styles.chat_list_item,
        }}>
        <ListItemAvatar>{props.loading ? <Skeleton animation="wave" variant="circular" width={40} height={40} /> : lengthChatOfAccounts ? <CustomAvatarBadge color="success" avatarData={messageWithAccounts[0]?.data()} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" invisible={!isOnline} badgePosition={{ right: 5, bottom: 5 }} /> : <CustomAvatarGroup avatars={messageWithAccounts} max={2} />}</ListItemAvatar>
        <ListItemText
          className={styles.wrapper_list_item_text}
          primary={
            props.loading ? (
              <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
            ) : (
              <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="span" variant="body2" color="text.primary">
                <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                  {lengthChatOfAccounts ? messageWithAccounts[0]?.data()?.surname + " " + messageWithAccounts[0]?.data()?.name : props.chat.data().title}
                </Typography>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary">
                  {!getSearchedGroup ? (
                    currentMessages?.length > 0 ? (
                      <Typography className={styles.date_of_dialog} component="span" variant="body2" color="text.secondary">{`${moment(currentMessages[currentMessages?.length - 1]?.data()?.date?.toDate()).fromNow()}`}</Typography>
                    ) : undefined
                  ) : (
                    <Tooltip title={`There is an account in this group with initial ${props.searchValue}`}>
                      <Chip color="primary" label={props.searchValue.length < 20 ? props.searchValue : props.searchValue.slice(0, 20)} />
                    </Tooltip>
                  )}
                </Typography>
              </Typography>
            )
          }
          secondary={
            props.loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary">
                {props?.chat?.data()?.participants.length >= 3 ? checkMessage || "Send a message..." : checkMessage || (!isOnline ? getTextOfStatusOnline(false) + moment(lastLoginAt || "").fromNow() : getTextOfStatusOnline(true))}
              </Typography>
            )
          }
        />
      </ListItem>
    </NavLink>
  );
};

export default Dialog;
