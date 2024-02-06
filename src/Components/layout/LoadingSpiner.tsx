import { Box, CircularProgress } from '@mui/material';

type Props = {
  message?: string;
};
const LoadingSpiner = ({ message = 'Now Loading...' }: Props) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    {message}
    <CircularProgress sx={{ color: 'theme.palette.primary.main' }} />
  </Box>
);

export default LoadingSpiner;
