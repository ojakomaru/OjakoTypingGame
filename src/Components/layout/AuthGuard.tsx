import { Box, CircularProgress } from "@mui/material";
import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypingDataContext, useAuthContext } from "../../Contexts";

type Props = {
  children: ReactNode;
};
export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext();
  const { loading } = useContext(TypingDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: '100vh'
        }}
      >
        {"Now Loading..."}
        <CircularProgress sx={{ color: "theme.palette.primary.main" }} />
      </Box>
    );
  return <>{children}</>;
};
