import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Search } from './Search/Search';
import { AppTitle } from './AppTitle';
import { AppBar, Box } from '@mui/material';
import { Hamburger } from './Hamburger/Hamburger';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  title: string;
  toggleNavigation?: () => void;
}

export default function Header(props: HeaderProps) {
  const { title, toggleNavigation } = props;
  const navigate = useNavigate();
  const AddTyping = () => navigate("/form");
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
          新規タイピング追加
        </Button>
        <Box sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}>
          <ThemeSwitcher />
          {/* <Notifications total={2} /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
