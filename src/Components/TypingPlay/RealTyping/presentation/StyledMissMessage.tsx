import Paragraph from "../../../ui/Paragraph";
import { styled } from "@mui/material";

const StyledMissMessage = styled(Paragraph)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: "5px",
  fontSize: "0.75rem",
}));
export default StyledMissMessage;
