import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ResultActionsProps {
  retry: () => void;
  missedRetry: () => void;
}
const ResultActions = ({ retry, missedRetry }: ResultActionsProps) => {
  const navigate = useNavigate();
  const backToHome = () => {
    retry();
    navigate("/");
  };
  return (
    <React.Fragment>
      <Button onClick={retry} variant="contained" size="large" color="primary">
        もう一回
      </Button>
      <Button
        onClick={missedRetry}
        variant="contained"
        size="large"
        color="primary"
      >
        ミスだけもう一回
      </Button>
      <Button
        onClick={backToHome}
        variant="contained"
        size="large"
        color="primary"
      >
        ホームへ戻る
      </Button>
    </React.Fragment>
  );
};

export default ResultActions;
