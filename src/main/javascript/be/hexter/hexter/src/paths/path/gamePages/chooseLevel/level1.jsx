import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Player from "../../../../gfx/environment/player";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  environmentOffsetX: state.environmentOffsetX,
  environmentOffsetY: state.environmentOffsetY,
});

const mapDispatchToProps = (dispatch) => ({});

function Level1Page({
  ctx,
  updateTick,
  windowSize,
  environmentOffsetX,
  environmentOffsetY,
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
  return (
    <>
      <Player />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Level1Page);
