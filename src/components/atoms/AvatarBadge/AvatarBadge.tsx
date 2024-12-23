/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { AccountType } from "../../../types/types";
import styles from "./AvatarBadge.module.scss";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

interface AvatarBadgePropsType {
  avatarData: AccountType;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  anchorOrigin: { horizontal: "left" | "right"; vertical: "bottom" | "top" };
  size?: "small" | "medium" | "large" | "full";
  overlap?: "circular" | "rectangular";
  badgeContent?: React.ReactNode;
  badgePosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  variant: "dot" | "standard";
  invisible?: boolean;
  onClick?: () => void;
}

const CustomAvatarBadge = (props: AvatarBadgePropsType) => {
  const size = props.size === "small" ? "30px" : props.size === "medium" ? "45px" : props.size === "large" ? "60px" : props.size === "full" ? "100%" : undefined;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      // color is default white fix this
      height: "10px",
      width: "10px",
      color: "currentColor",
      background: theme.palette[props.color],
      borderRadius: "50%",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      top: props.badgePosition?.top,
      right: props.badgePosition?.right,
      bottom: props.badgePosition?.bottom,
      left: props.badgePosition?.left,

      "&::after": {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.5s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return props?.badgeContent ? (
    <Badge sx={{ height: "100% !important", width: "100% !important" }} color={props.color} anchorOrigin={{ vertical: props.anchorOrigin.vertical, horizontal: props.anchorOrigin.horizontal }} invisible={props.invisible} overlap={props.overlap} badgeContent={props?.badgeContent} variant={props?.variant}>
      <Avatar sx={{ height: `${size} !important`, maxHeight: size, width: `${size} !important`, maxWidth: size, cursor: props.onClick && "pointer" }} src={props.avatarData.avatar || defaultAvatar} alt="" onClick={props.onClick} />
    </Badge>
  ) : (
    <StyledBadge sx={{ height: "100% !important", width: "100% !important" }} color={props.color} anchorOrigin={{ vertical: props.anchorOrigin.vertical, horizontal: props.anchorOrigin.horizontal }} invisible={props.invisible} overlap={props.overlap} variant={props?.variant}>
      <Avatar sx={{ height: `${size} !important`, maxHeight: size, width: `${size} !important`, maxWidth: size, cursor: props.onClick && "pointer" }} src={props.avatarData?.avatar || defaultAvatar} alt="" onClick={props.onClick} />
    </StyledBadge>
  );
};

export default CustomAvatarBadge;
