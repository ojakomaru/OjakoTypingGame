import { Button, Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

interface GithubButtonProps {
  onGithubSignIn: () => void;
}
export default function GithubButton(props: GithubButtonProps) {
  return (
    <Button
      variant="outlined"
      startIcon={
        <Avatar>
          <GitHubIcon />
        </Avatar>
      }
      style={{ textTransform: "capitalize" }}
      onClick={props.onGithubSignIn}
    >
      {"Githubでログイン"}
    </Button>
  );
}
