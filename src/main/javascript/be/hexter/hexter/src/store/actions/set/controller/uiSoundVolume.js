import { UI_SOUND_CONTROLLER_VOLUME } from "../../types";

const setBackgroundSoundControllerVolume = (uiSoundControllerVolume) => ({
  type: UI_SOUND_CONTROLLER_VOLUME,
  payload: {
    uiSoundControllerVolume,
  },
});

export default setBackgroundSoundControllerVolume;
