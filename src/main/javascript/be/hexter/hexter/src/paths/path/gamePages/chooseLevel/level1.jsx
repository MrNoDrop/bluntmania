import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Player from "../../../../gfx/environment/player";
import Mossy from "../../../../gfx/environment/mossy";
import setLevelDimension from "../../../../store/actions/set/level/dimension";

const mapStateToProps = ({ state }) => ({
  state: state,
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  environmentOffsetX: state.environmentOffsetX,
  environmentOffsetY: state.environmentOffsetY,
  level: state.level,
});

const mapDispatchToProps = (dispatch) => ({
  setLevelDimension: (state, width, height) =>
    dispatch(setLevelDimension(state, width, height)),
});

function Level1Page({
  state,
  ctx,
  updateTick,
  windowSize,
  environmentOffsetX,
  environmentOffsetY,
  setLevelDimension,
  level,
}) {
  const navigateTo = useNavigate();
  window.navigateTo = navigateTo;
  useEffect(() => {
    if (!ctx) {
      navigateTo("/");
    } else {
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 10;
      ctx.strokeRect(
        0 + environmentOffsetX,
        0 + environmentOffsetY,
        level.width,
        level.height
      );
    }
  }, [ctx, navigateTo, updateTick, windowSize]);
  useEffect(() => {
    setLevelDimension(state, 3200, 2000);
  }, []);
  return (
    <>
      <Player x={0} y={0} />
      <Mossy x={100} y={200} />
      <Mossy x={100} y={328} assetY={1} />
      <Mossy x={228} y={200} assetX={1} />
      <Mossy x={228} y={328} assetX={1} assetY={1} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Level1Page);
