//update tick
import { SET_CONTEXT2D } from "../../types";

const setCanvasContext2D = (context2D) => ({
  type: SET_CONTEXT2D,
  payload: {
    context2D,
  },
});

export default setCanvasContext2D;
