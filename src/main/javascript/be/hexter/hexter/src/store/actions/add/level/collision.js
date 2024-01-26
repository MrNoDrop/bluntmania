import { ADD_LEVEL_COLLISION } from "../../types";

const addLevelCollision = (currentState, collision) => ({
  type: ADD_LEVEL_COLLISION,
  payload: {
    level: {
      ...currentState.level,
      collisions: currentState.level.collisions.push(collision),
    },
  },
});

export default addLevelCollision;
