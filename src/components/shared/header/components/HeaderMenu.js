import React from "react";
import {
  withStyles,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

import ProfileDropDown from "./ProfileDropDown.js";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: 0,
    boxShadow: "0 3px 21px rgba(54, 106, 255, 0.10196)",
    width: 200
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const HeaderMenu = ({ history }) => (
  <ul className="topheader_right_content mb-0">
    <ProfileDropDown
      StyledMenu={StyledMenu}
      StyledMenuItem={MenuItem}
      ListItemText={ListItemText}
      ListItemIcon={ListItemIcon}
      Button={Button}
      history={history}
    />
  </ul>
);

export default HeaderMenu;
