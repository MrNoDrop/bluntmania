import { SET_PLAYER_POSITION } from "../types";

const setPlayerPosition = (currentState, xPos, yPos) => ({
  type: SET_PLAYER_POSITION,
  payload: {
    player: { ...currentState.player, xPos, yPos },
  },
});

export default setPlayerPosition;
