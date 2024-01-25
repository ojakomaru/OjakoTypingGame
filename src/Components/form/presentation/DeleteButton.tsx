import { Button } from "@mui/material";
import React from "react";
import { showConfirmDialog } from "../../../Hooks";
import { useNavigate } from "react-router-dom";
import { TypingDataType } from "../../../@types";
import { TypingDataContext } from "../../../Contexts";

interface DeleteButtonProps {
  deleteID: string;
}
const DeleteButton = ({ deleteID }: DeleteButtonProps) => {
  const { setTypingData, setTypingDatas } = React.useContext(TypingDataContext);
  const navigate = useNavigate();
  const deleteConfirmDialog = async () => {
    const confirmed = await showConfirmDialog(
      "登録済みのタイピングデータを削除してもよろしいですか？",
      true
    );
    if (!confirmed) return;
    let storageData = await JSON.parse(
      localStorage.getItem("typingData") as string
    );
    // タイピングIDを検索して元データから削除
    await storageData.splice(
      storageData.findIndex((data: TypingDataType) => data.id === deleteID),
      1
    );
    localStorage.setItem("typingData", JSON.stringify(storageData));
    setTypingDatas(storageData);
    setTypingData(storageData[0]);
    navigate("/home");
  };
  return (
    <Button variant="outlined" onClick={deleteConfirmDialog}>
      このデータを削除
    </Button>
  );
};

export default DeleteButton;
