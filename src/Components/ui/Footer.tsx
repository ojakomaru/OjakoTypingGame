/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, useTheme } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Oja Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface FooterProps {
  description: string;
}

export default function Footer({ description }: FooterProps) {
  const theme = useTheme();

  return (
    <Box
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: ${theme.palette.background.paper};
      `}
    >
      <Typography
        css={css`
          word-spacing: 0.1rem;
          text-transform: uppercase;
        `}
        variant="caption"
        align="center"
        color="textSecondary"
      >
        {description}
      </Typography>
      <Copyright />
    </Box>
  );
}
