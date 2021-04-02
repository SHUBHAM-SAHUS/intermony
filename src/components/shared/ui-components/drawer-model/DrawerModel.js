import React from "react";
import { makeStyles, Drawer } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: "100%"
  },
  drawerContainer: {
    background: "transparent"
  },
  paperContainer: {
    width: 350,
    marginTop: 50,
    borderRadius: 4,
    left: "40%",
    overflow: "hidden"
  },
  fullList: {
    width: "auto"
  }
});

const DrawerModel = ({ children, open, toggleDrawer, drawerClasses }) => {
  const defaultClasses = useStyles();
  const classes = drawerClasses ? drawerClasses : defaultClasses;
  return (
    <Drawer
      anchor="top"
      classes={{
        paper: classes.paperContainer
      }}
      className={classes.drawerContainer}
      open={open}
      onClose={toggleDrawer(false)}
    >
      <div className={classes.list} role="presentation">
        {children}
      </div>
    </Drawer>
  );
};

export default DrawerModel;
