import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import React from "react";


function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"このサイトを離れますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            行った変更が保存されない可能性があります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>同意しない</Button>
          <Button onClick={handleClose} autoFocus>
            同意する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const DeleteButton = () => {
  return (
    <Button variant="outlined" onClick={() => null}>
      すべて削除
    </Button>
  );
};

export default DeleteButton;
