import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Search } from './Search/Search';
import { AppTitle } from './AppTitle';
import { AppBar } from '@mui/material';
import { Hamburger } from './Hamburger/Hamburger';

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
        <Button onClick={AddTyping} variant="outlined">
          新規タイピング追加
        </Button>
      </Toolbar>
    </AppBar>
  );
}
