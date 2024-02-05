import { useState } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type Props = {
  root: Root; // ルート要素
  message: string; // メッセージ内容
  resolve: (f: boolean) => void; // 確認ダイアログが閉じられたときに true または false を渡すためのコールバック関数
  cancel: boolean; // キャンセルボタン表示・非表示を制御
};
function ConfirmDialog({ root, message, resolve, cancel = false }: Props) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    root.unmount();
    resolve(false);
  };

  const clickOk = () => {
    setOpen(false);
    root.unmount();
    resolve(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'警告：入力フォーム'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {cancel && (
            <Button autoFocus onClick={handleClose}>
              {'キャンセル'}
            </Button>
          )}
          <Button onClick={clickOk}>{'OK'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const showConfirmDialog = async (message: string, cancel = false): Promise<boolean> => {
  const rootEl = document.getElementById('root'); // "root"はルート要素のIDに応じて変更ください
  const newEl = document.createElement('div');
  newEl.id = 'confirm';
  rootEl?.appendChild(newEl);
  const container = document.getElementById('confirm');
  if (!container) return false;
  const root = createRoot(container);

  return new Promise<boolean>((resolve, reject) => {
    try {
      root.render(<ConfirmDialog root={root} message={message} resolve={resolve} cancel={cancel} />);
    } catch (err) {
      reject(err);
    }
  });
};