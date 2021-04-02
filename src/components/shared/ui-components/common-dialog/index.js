import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
    makeStyles
} from "@material-ui/core";

import * as commonService from "../../../../utils/CommonService.js";

const useStyles = makeStyles({
  root: {
    minWidth: 500
  },
  btn_center:  {
  width: "auto",
  margin: "auto",
  left: "auto",
    minWidth: "150px"
}
})
const ConfirmDialog = () => {
  const classes = useStyles();
  const defaultOptions = {
    open: false,
    data: { message: "Are you Sure?" },
    cancelText: "Cancel",
    ConfirmText: "Okay",
    onConfirm: () => {}
  };
  const [dialogOptions, setDialogOptions] = useState(defaultOptions);

  commonService.isDialogOpen.subscribe(data => {
    if (data && !dialogOptions.open) setDialogOptions(data);
    else if (!data && dialogOptions.open) setDialogOptions(defaultOptions);
  });

  const {
    open,
    data,
    cancelText,
    confirmText,
    onConfirm,
    onCancel
  } = dialogOptions;

  const handleConfirm = confirm => {
    if (typeof onConfirm !== "undefined") onConfirm(confirm);
  };

  const handleClose = () => {
    if (typeof onCancel !== "undefined") onCancel();
  };
  return (
    <Dialog
      onClose={handleClose}
      className={classes.root}
      aria-labelledby="common-dialog-title"
      open={open}
      maxWidth={"md"}
    >

      <DialogContent className="p-5 text-center" style={{width: 350}}>
        {data.title && (
            <DialogTitle id="common-dialog-title">{data.title}</DialogTitle>
        )}
        {data.message}</DialogContent>
      <Divider></Divider>
      {open && (
        <DialogActions className="p-2">
          <Button
            variant="outlined"
            size="medium"
            className={classes.btn_center}
            onClick={() => handleClose(false)}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={`btn-primary ${classes.btn_center}`}
            onClick={() => handleConfirm(true)}
          >
            {confirmText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmDialog;
