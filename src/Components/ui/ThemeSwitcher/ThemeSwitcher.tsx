import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { Flare, NightsStay } from "@mui/icons-material";
import { ThemeModeContext } from "../../../Contexts";
import { Badge, Icon, IconButton, Tooltip } from "@mui/material";
import { LIGHT_MODE_THEME } from "../../../@types/appTheme";

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const { toggleThemeMode } = useContext(ThemeModeContext);
  console.log(theme.palette.mode);
  return (
    <Tooltip title={"トグルテーマ"} placement="bottom" arrow>
      <IconButton size="large" color="inherit" onClick={toggleThemeMode}>
        <Badge
          color={theme.palette.mode === LIGHT_MODE_THEME ? "error" : "primary"}
        >
          <Icon
            component={
              theme.palette.mode === LIGHT_MODE_THEME ? Flare : NightsStay
            }
          />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};
