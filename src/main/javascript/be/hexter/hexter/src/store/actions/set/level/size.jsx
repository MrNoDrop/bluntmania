import { SET_LEVEL_SIZE } from "../../types";

const setLevelSize = (currentState, width, height) => ({
  type: SET_LEVEL_SIZE,
  payload: { level: { ...currentState.level, width, height } },
});
export default setLevelSize;
