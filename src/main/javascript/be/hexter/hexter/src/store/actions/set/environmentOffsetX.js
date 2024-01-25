import { SET_ENVIRONMENT_OFFSET_X } from "../types";

const setEnvironmentOffsetX = (environmentOffsetX) => ({
  type: SET_ENVIRONMENT_OFFSET_X,
  payload: {
    environmentOffsetX,
  },
});

export default setEnvironmentOffsetX;
