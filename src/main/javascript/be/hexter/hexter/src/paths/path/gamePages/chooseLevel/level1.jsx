import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Player from "../../../../gfx/environment/player";
import setLevelSize from "../../../../store/actions/set/level/size";

const mapStateToProps = ({ state }) => ({
  state: state,
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  environmentOffsetX: state.environmentOffsetX,
  environmentOffsetY: state.environmentOffsetY,
});

const mapDispatchToProps = (dispatch) => ({
  setLevelSize: (currentState, width, height) =>
    dispatch(setLevelSize(currentState, width, height)),
});

function Level1Page({
  state,
  ctx,
  updateTick,
  windowSize,
  environmentOffsetX,
  environmentOffsetY,
  setLevelSize,
}) {
  const navigateTo = useNavigate();
  window.navigateTo = navigateTo;
  useEffect(() => {
    if (!ctx) {
      navigateTo("/");
    } else {
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    }
  }, [ctx, navigateTo, updateTick, windowSize]);
  useEffect(() => {
    setLevelSize(state, 3200, 2000);
  }, []);
  return (
    <>
      <Player />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Level1Page);
