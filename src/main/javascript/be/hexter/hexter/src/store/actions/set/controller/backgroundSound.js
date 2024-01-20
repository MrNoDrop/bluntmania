import { SET_BACKGROUND_SOUND_CONTROLLER } from "../../types";

const setBackgroundSoundController = (backgroundSoundController) => ({
  type: SET_BACKGROUND_SOUND_CONTROLLER,
  payload: {
    backgroundSoundController,
  },
});

export default setBackgroundSoundController;
