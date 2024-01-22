import { BACKGROUND_SOUND_CONTROLLER_MUTED } from "../../types";

const setBackgroundSoundController = (backgroundSoundControllerMuted) => ({
  type: BACKGROUND_SOUND_CONTROLLER_MUTED,
  payload: {
    backgroundSoundControllerMuted,
  },
});

export default setBackgroundSoundController;
