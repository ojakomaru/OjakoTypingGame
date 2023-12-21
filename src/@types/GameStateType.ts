const HOME = "home";
const READY = "ready";
const PLAYING = "playing";
const FINISHED = "finished";
const SETTING = "setting";

type GAME_STATE =
  | typeof HOME
  | typeof READY
  | typeof PLAYING
  | typeof FINISHED
  | typeof SETTING;

export { HOME, READY, PLAYING, FINISHED, SETTING, type GAME_STATE };
