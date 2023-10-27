import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { Flare, NightsStay } from "@mui/icons-material";
import { ThemeModeContext } from "../../../Contexts";
import { Badge, Icon, IconButton, Tooltip } from "@mui/material";
import { LIGHT_THEME } from "../../../@types";

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const { toggleThemeMode } = useContext(ThemeModeContext);
  return (
    <Tooltip title={"トグルテーマ"} placement="bottom" arrow>
      <IconButton size="large" color="inherit" onClick={toggleThemeMode}>
        <Badge color={theme.palette.mode === LIGHT_THEME ? "error" : "primary"}>
          <Icon
            component={theme.palette.mode === LIGHT_THEME ? Flare : NightsStay}
          />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};
