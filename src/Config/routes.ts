import {
  Home as HomeIcon,
  CodeOutlined as CodeIcon,
  SettingsOutlined as SettingsIcon,
  ListAlt as ListIcon,
} from "@mui/icons-material";
import   SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import SportsScoreSharpIcon from "@mui/icons-material/SportsScoreSharp";

import { Home, NotFound, Play, TypingForm } from "../Components/Pages";
import { Route } from "../@types/Route";

const routes: Array<Route> = [
  {
    key: "router-home",
    title: "Home",
    description: "Home",
    component: Home,
    path: "/",
    isEnabled: true,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-play",
    title: "Play",
    description: "Play View is Start",
    component: Play,
    path: "/play",
    isEnabled: true,
    icon: SmartDisplayOutlinedIcon,
    appendDivider: true,
  },
  {
    key: "router-form",
    title: "AddTypingForm",
    description: "Add New Typingdata",
    path: "/form",
    component: TypingForm,
    isEnabled: true,
    icon: AddCircleOutlineSharpIcon,
    appendDivider: true,
  },
  {
    key: "router-scores",
    title: "ScoreRankings",
    description: "Typing Score is Rankings",
    path: "/form",
    isEnabled: true,
    icon: SportsScoreSharpIcon,
    appendDivider: true,
  },
  {
    key: "router-settings",
    title: "GameSettings",
    description: "Game Settings",
    path: "/settings",
    isEnabled: true,
    icon: SettingsIcon,
  },
  {
    key: "router-notfound",
    title: "NotfoundPage",
    description: "Page is Notfound",
    path: "*",
    component: NotFound,
    isEnabled: true,
  },
];

export default routes;
