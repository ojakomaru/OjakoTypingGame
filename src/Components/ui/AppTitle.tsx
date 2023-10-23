/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const AppTitle = () => {
  const location = useLocation();
  let APP_TITLE: string = "OjakoTyping"
  switch (location.pathname) {
    case "/":
      APP_TITLE += `Home`;
      break;
    case "/play":
      APP_TITLE += `Play`;
      break;
    case "/setting":
      APP_TITLE += `Setting`;
      break;
    case "/form":
      APP_TITLE += `Form`;
      break;
  }
  return (
    <NavLink
      to="/"
      css={css`
        text-decoration: none;
        color: inherit;
      `}
    >
      <Typography
        variant="h6"
        noWrap
        css={css`
          display: {
            xs: none;
            sm: block;
          }
          cursor: pointer;
        `}
      >
        {APP_TITLE}
      </Typography>
    </NavLink>
  );
};
