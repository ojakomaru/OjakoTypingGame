import { ReactElement, useState, useCallback } from "react";

import { Dialog } from "@mui/material";

export type UseCustomConfirmOption = {
  /** コンテンツを描画する */
  renderContent: (props: {
    /** OKアクションを実行する */
    ok: () => void;
    /** キャンセルする */
    cancel: () => void;
  }) => ReactElement;
};

/** クリック時に実行されるハンドラー */
type ActionHandler = () => void;

export type ReturnUseCustomConfirm = {
  /** 確認ダイアログを出す */
  confirm: (props: { onOk: ActionHandler }) => void;
  /** ダイアログ要素 */
  dialogElement: ReactElement;
};

/**
 * カスタマイズされた確認ダイアログを呼び出すhooks
 */
export const useCustomConfirm = function ({
  renderContent,
}: UseCustomConfirmOption): ReturnUseCustomConfirm {
  // ダイアログコンテンツ内でOKボタンを押したときに実行するメソッドをstateで持つ
  const [execOk, setExecOk] = useState<ActionHandler | null>(null);

  const handleOk = useCallback(() => {
    if (execOk == null) {
      return;
    }
    execOk();
    setExecOk(null);
  }, [execOk]);

  const handleClose = useCallback(() => {
    setExecOk(null);
  }, []);

  const confirm: ReturnUseCustomConfirm["confirm"] = useCallback(({ onOk }) => {
    setExecOk(() => onOk);
  }, []);

  // ダイアログ内に表示するReactElementを生成する
  const dialogContentElement = renderContent({
    ok: handleOk,
    cancel: handleClose,
  });

  // OK時の実行メソッドを持っているかでダイアログを開くか判断する
  const isOpen = execOk != null;
  const dialogElement: ReturnUseCustomConfirm["dialogElement"] = (
    <Dialog open={isOpen} onClose={handleClose}>
      {dialogContentElement}
    </Dialog>
  );

  return {
    confirm,
    dialogElement,
  };
};
