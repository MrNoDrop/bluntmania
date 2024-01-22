import { BACKGROUND_SOUND_CONTROLLER_VOLUME } from "../../types";

const setBackgroundSoundControllerVolume = (
  backgroundSoundControllerVolume
) => ({
  type: BACKGROUND_SOUND_CONTROLLER_VOLUME,
  payload: {
    backgroundSoundControllerVolume,
  },
});

export default setBackgroundSoundControllerVolume;
