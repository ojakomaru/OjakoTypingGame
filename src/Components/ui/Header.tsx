import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const {title } = props;
  const navigate = useNavigate();
  const AddTyping = () => navigate("/form");
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
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
    </React.Fragment>
  );
}
