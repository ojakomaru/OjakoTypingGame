import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
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
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button onClick={AddTyping} variant="outlined">
          新規タイピング追加
        </Button>
      </Toolbar>
    </AppBar>
  );
}
