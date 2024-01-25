import { SET_LEVEL_DIMENSION } from "../../types";

const setLevelDimension = (currentState, width, height) => ({
  type: SET_LEVEL_DIMENSION,
  payload: {
    level: { ...currentState.level, width, height },
  },
});

export default setLevelDimension;
