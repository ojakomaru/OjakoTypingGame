import {
  Home as HomeIcon,
  SettingsOutlined as SettingsIcon,
  GitHub as GitHubIcon,
  Public as PublicIcon,
  PublicOff as PrivateIcon,
  SmartDisplayOutlined,
  AddCircleOutlineSharp,
  SportsScoreSharp,
  ModeEdit,
  AccountCircle,
} from "@mui/icons-material";

import {
  Home,
  NotFound,
  Play,
  TypingForm,
  GameSetting,
} from "../Components/Pages";
import { Route } from "../@types/Route";
import Auth from "../Components/Auth/Auth";

const routes: Array<Route> = [
  {
    key: "router-auth",
    title: "Auth",
    description: "Auth",
    component: Auth,
    path: "/",
    isEnabled: false,
    icon: AccountCircle,
    appendDivider: false,
  },
  {
    key: "router-home",
    title: "Home",
    description: "Home",
    component: Home,
    path: "/home",
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
    icon: SmartDisplayOutlined,
    appendDivider: true,
  },
  {
    key: "router-form",
    title: "AddTypingForm",
    description: "Add New Typingdata",
    path: "/form",
    component: TypingForm,
    isEnabled: true,
    icon: AddCircleOutlineSharp,
    appendDivider: true,
  },
  {
    key: "router-updateform",
    title: "UpdateTypingForm",
    description: "Update Typingdata",
    path: "/form/:id",
    component: TypingForm,
    isEnabled: false,
    icon: ModeEdit,
    appendDivider: true,
  },
  {
    key: "router-scores",
    title: "ScoreRankings",
    description: "Typing Score is Rankings",
    path: "/scores",
    isEnabled: true,
    icon: SportsScoreSharp,
    appendDivider: true,
  },
  {
    key: "router-settings",
    title: "GameSettings",
    description: "Game Settings",
    path: "/settings",
    component: GameSetting,
    isEnabled: true,
    icon: SettingsIcon,
  },
  {
    key: "router-gh",
    title: "GitHub",
    description: "GitHub",
    isEnabled: true,
    icon: GitHubIcon,
    subRoutes: [
      {
        key: "router-gh-public",
        title: "Public Repos",
        description: "Public Repos",
        path: "/gh/public",
        isEnabled: true,
        icon: PublicIcon,
      },
      {
        key: "router-gh-private",
        title: "Private Repos",
        description: "Private Repos",
        path: "/gh/private",
        isEnabled: false,
        icon: PrivateIcon,
      },
    ],
  },
  {
    key: "router-notfound",
    title: "NotfoundPage",
    path: "*",
    component: NotFound,
    isEnabled: false,
  },
];

export default routes;
