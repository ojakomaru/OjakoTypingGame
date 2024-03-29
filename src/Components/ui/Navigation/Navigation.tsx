import { Drawer as MuiDrawer, styled } from '@mui/material';
import { Routes } from './Routes';
import { navClosedMixin, navOpenedMixin } from '../../../styles/mixins';

interface NavigationProps {
  open: boolean | undefined;
  handleClose: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: 250,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...navOpenedMixin(theme),
    '& .MuiDrawer-paper': navOpenedMixin(theme),
  }),
  ...(!open && {
    ...navClosedMixin(theme),
    '& .MuiDrawer-paper': navClosedMixin(theme),
  }),
}));

export const Navigation = ({ open, handleClose }: NavigationProps) => (
  <Drawer variant="permanent" open={open} onClose={handleClose}>
    <DrawerHeader />
    <Routes />
  </Drawer>
);
