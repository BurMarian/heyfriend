import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, ContainerCoverProfile } from "../../../utils/helperForProfile/helperForProfile";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { editConstant, profileConstant } from "../../../core/constants/constants";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import betaVershion from "../../../assets/images/betaVershion.png";

const ProfileInfo = (props) => {
  const [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);
  const [openModalCoverProfile, setOpenModalCoverProfile] = React.useState(false);

  let otherProfile = props.accounts.find((profile) => (profile && props.id ? profile.id === props.id : undefined));
  let oftenCheckMyProfile = props?.account && !props?.id;
  let oftenCheckOtherProfile = otherProfile && props?.id;
  let coverPhoto = oftenCheckMyProfile && props?.account?.coverPhoto ? props.account.coverPhoto : oftenCheckOtherProfile && otherProfile.coverPhoto ? otherProfile.coverPhoto : undefined;
  let checkFollow = props?.account?.following ? props.account.following.find((account) => account.id === props.id) : undefined;

  console.log(coverPhoto);

  return (
    <div className={styles.profile_info}>
      <div className={styles.profile_cover} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${defaultAvatar})` }}>
        <div className={styles.profile_cover} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${coverPhoto})` }}>
          <div className={styles.profile_cover_line}>
            {/* full name */}
            {props.account ? <div className={styles.profile_fullName}>{oftenCheckOtherProfile ? otherProfile?.data().surname + " " + otherProfile?.data().name : oftenCheckMyProfile ? props.account.surname + " " + props.account.name : <></>}</div> : null}

            {/* status */}
            <div className={styles.profile_status}>{oftenCheckOtherProfile?.status ? <div>{otherProfile?.data().status}</div> : oftenCheckMyProfile && props.account.status ? <div>{props.account.status}</div> : undefined}</div>
          </div>
          {/* wrapper picture */}
          <div className={openModalAvatarProfile && !props.id ? styles.wrapper_profilePicture_active__center : styles.wrapper_profilePicture__center}>{oftenCheckMyProfile && props.account.avatar ? <img onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))} src={props?.account?.avatar} title="Change profile photo" alt="" /> : oftenCheckOtherProfile && otherProfile?.data().avatar ? <img src={otherProfile?.data().profile.avatar} alt="" /> : !props.id ? <img onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))} src={defaultAvatar} title="Change profile photo" alt="" /> : <img src={defaultAvatar} alt="" />}</div>

          {/* change cover img */}
          {!props.id ? (
            <div className={styles.wrapper_change_cover}>
              <PhotoCameraOutlinedIcon onClick={() => (openModalCoverProfile ? setOpenModalCoverProfile(false) : setOpenModalCoverProfile(true))} className={styles.icon_change_cover} fontSize="medium" />
            </div>
          ) : undefined}
        </div>

        {/* 				profile info line				 */}
        <div className={styles.profile_info_line}>
          {/* wrapper picture */}
          <div className={styles.wrapper_profilePicture}>
            <div className={openModalAvatarProfile && !props?.id ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>{oftenCheckMyProfile && props.account.avatar ? <img onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))} src={props?.account?.avatar} title="Change profile photo" alt="" /> : oftenCheckOtherProfile && otherProfile?.data().avatar ? <img src={otherProfile?.data().profile.avatar} alt="" /> : !props.id ? <img onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))} src={defaultAvatar} title="Change profile photo" alt="" /> : <img src={defaultAvatar} alt="" />}</div>

            {/* wrapper profile details info line */}
            <div className={styles.wrapper_profile_details_info_line}>
              {/* full name */}
              <div className={styles.profile_fullName__media}>{oftenCheckOtherProfile ? otherProfile?.data().surname + " " + otherProfile?.data().name : oftenCheckMyProfile ? props.account.surname + " " + props.account.name : <></>}</div>

              {/* status */}
              <div className={styles.profile_status__media}>{oftenCheckOtherProfile && otherProfile?.data().status ? <div>{otherProfile?.data().status}</div> : oftenCheckMyProfile && props.account.status ? <div>{props.account.status}</div> : undefined}</div>

              <div className={styles.details_info_content}>
                <div className={styles.details_info}>
                  <div className={styles.detail_number}>{oftenCheckOtherProfile && otherProfile?.data().posts && otherProfile?.data().posts.length > 0 ? otherProfile?.data().posts.length : 0 || (oftenCheckMyProfile && props.account.posts && props.account.posts.length > 0) ? props.account.posts.length : 0}</div>
                  <div className={styles.detail_title}>Posts</div>
                </div>
                <div className={styles.details_info}>
                  <div className={styles.detail_number}>{oftenCheckOtherProfile && otherProfile?.data().followers && otherProfile?.data().followers.length > 0 ? otherProfile?.data().followers.length : 0 || (oftenCheckMyProfile && props.account.followers && props.account.followers.length > 0) ? props.account.followers.length : 0}</div>
                  <div className={styles.detail_title}>Followers</div>
                </div>
                <div className={styles.details_info}>
                  <div className={styles.detail_number}>{oftenCheckOtherProfile && otherProfile?.data().following && otherProfile?.data().following.length > 0 ? otherProfile?.data().following.length : 0 || (oftenCheckMyProfile && props.account.following && props.account.following.length > 0) ? props.account.following.length : 0}</div>
                  <div className={styles.detail_title}>Following</div>
                </div>
              </div>

              <div className={styles.wrapper_button}>
                {props?.id ? (
                  <>
                    <Button className={styles.button} style={{ textTransform: "capitalize" }} variant="contained">
                      Message
                      <img className={styles.beta_vershion_picture} src={betaVershion} alt="" />
                    </Button>

                    {checkFollow ? (
                      <Button style={{ textTransform: "capitalize" }} onClick={() => props.unFollowing(props.id)} variant="contained">
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                          props.following(props.id);
                        }}
                        variant="contained">
                        Follow
                      </Button>
                    )}
                  </>
                ) : (
                  <NavLink className={styles.navLink_message} to={`${editConstant}${profileConstant}`}>
                    <Button variant="contained">
                      <FontAwesomeIcon className={styles.icon} icon={faPencilAlt} />
                      Edit profile
                    </Button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          {/* toggle show container for change something in profile */}
          {/* toggle cover container */}
          {/* {!props.id && props.account.id !== props.id ? <div>{openModalCoverProfile ? <ContainerCoverProfile profile={props.profile} accounts={props.accounts} getProfileData={props.getProfileData} account={props.account} openModalCoverProfile={openModalCoverProfile} setOpenModalCoverProfile={setOpenModalCoverProfile} /> : <></>}</div> : <></>} */}

          {/* change picture */}
          {/* {!props.id && props.account.id !== props.id ? <div>{openModalAvatarProfile ? <ChangeProfilePictureContainer profile={props.profile} accounts={props.accounts} getProfileData={props.getProfileData} account={props.account} openModalAvatarProfile={openModalAvatarProfile} setOpenModalAvatarProfile={setOpenModalAvatarProfile} /> : <></>}</div> : <></>} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
