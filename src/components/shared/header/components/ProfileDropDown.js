import React, { useState } from "react";
// import dropdown icons
// import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import {useDispatch, useSelector} from "react-redux";

import * as userAuthAction from "redux/actions/AuthActions";
import * as commonService from "../../../../utils/CommonService.js";

import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
const ProfileDropdown = ({
  StyledMenu,
  StyledMenuItem,
  ListItemText,
  ListItemIcon,
  Button,
  history
}) => {
  const dispatch= useDispatch();
  const [profileDropDown, setProfileDropDown] = useState(null);
  const {user} = useSelector(state => state.authReducer);

  const handleProfileClick = event => {
    setProfileDropDown(event.currentTarget);
  };

  const handleClose = () => {
    setProfileDropDown(null);
  };

  const handleLogout = confirm => {
    if (confirm) {
      commonService.isLoading.onNext(true);
      dispatch(userAuthAction.logout());
      commonService.forSuccess("Logged out successfully!", "Success");
      history.push("/login");
      setTimeout(() => commonService.isLoading.onNext(false), 500);
    }
    commonService.isDialogOpen.onNext(false);
  };

  const logout = () => {
    commonService.isDialogOpen.onNext({
      open: true,
      data: {
        message: "Are you sure you want to Logout?"
      },
      cancelText: "Cancel",
      confirmText: "Okay",
      onConfirm: handleLogout,
      onCancel: () =>  commonService.isDialogOpen.onNext(false)
    });
  };

  const menuItems = [
    {
      handleClick: logout,
      title: "Logout"
    }
  ];

  const styleMenu = ({ handleClick, Icon, title, index }) => {
    return (
      <StyledMenuItem style={{borderTop: index ? '1px solid rgba(0, 0, 0, 0.08)' : "none"}} key={index}>
        <ListItemText primary={title} onClick={() => handleClick()} />
      </StyledMenuItem>
    );
  };

  return (
    <li className="profile-menu">
      <span
          aria-haspopup="true"
          className="cursor-pointer color-secondary"
          onClick={handleProfileClick}
          > <AccountCircleTwoToneIcon color="secondary" style={{fontSize: "40px"}}/> {user.first_name} {user.last_name}</span>
      <StyledMenu
        id="customized-menu"
        anchorEl={profileDropDown}
        keepMounted
        open={Boolean(profileDropDown)}
        onClose={handleClose}
      >
        {menuItems.map((menuItem, index) => styleMenu({ ...menuItem, index }))}
      </StyledMenu>
    </li>
  );
};

export default ProfileDropdown;
