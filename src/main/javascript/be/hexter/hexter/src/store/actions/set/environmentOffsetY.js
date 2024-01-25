import { SET_ENVIRONMENT_OFFSET_Y } from "../types";

const setEnvironmentOffsetY = (environmentOffsetY) => ({
  type: SET_ENVIRONMENT_OFFSET_Y,
  payload: {
    environmentOffsetY,
  },
});

export default setEnvironmentOffsetY;
