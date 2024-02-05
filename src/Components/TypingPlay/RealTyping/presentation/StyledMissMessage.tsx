import { styled } from '@mui/material';
import Paragraph from '../../../ui/Paragraph';

const StyledMissMessage = styled(Paragraph)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: '5px',
  fontSize: '0.75rem',
}));
export default StyledMissMessage;
