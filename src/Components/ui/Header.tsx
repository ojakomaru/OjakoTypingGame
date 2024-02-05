import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { signOut } from "firebase/auth";
import { Search } from "./Search/Search";
import { AppTitle } from "./AppTitle";
import { Hamburger } from "./Hamburger/Hamburger";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { auth } from "../../Config";

interface HeaderProps {
  toggleNavigation?: () => void;
}

export default function Header({ toggleNavigation }: HeaderProps) {
  const navigate = useNavigate();
  const AddTyping = () => navigate("/form");
  const logout = async () => signOut(auth);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar disableGutters variant="dense">
        <Hamburger toggleNavigation={toggleNavigation} />
        <AppTitle />
        <Search />
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={AddTyping} variant="contained" color="secondary">
          {'新規タイピング追加'}
        </Button>
        <Button onClick={logout} variant="contained" color="secondary">
          {'ログアウトする'}
        </Button>
        <Box sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}>
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
