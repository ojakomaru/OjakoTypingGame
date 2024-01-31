import { Button, Avatar } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

interface GoogleButtonProps {
  onGoogleSignIn: () => void;
}
export default function GoogleButton(props: GoogleButtonProps) {
  return (
    <Button
      variant="outlined"
      startIcon={
        <Avatar>
          <GoogleIcon />
        </Avatar>
      }
      style={{ textTransform: "capitalize" }}
      onClick={props.onGoogleSignIn}
    >
      {"Googleでログイン"}
    </Button>
  );
}
