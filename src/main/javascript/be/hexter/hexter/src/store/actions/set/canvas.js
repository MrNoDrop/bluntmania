//update tick
import { SET_CANVAS } from "../../types";

const setCanvas = (canvas) => ({
  type: SET_CANVAS,
  payload: {
    canvas,
  },
});

export default setCanvas;
