import React, { useEffect, useState } from "react";
import { vmin } from "../../tools/vScale";
import { connect } from "react-redux";
import useImageLoader from "../../hooks/useImageLoader";
import addLevelCollision from "../../store/actions/add/level/collision";
import { Rectangle } from "../../tools/rectangle";

const mapStateToProps = ({ state }) => ({
  state: state,
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  environmentOffsetX: state.environmentOffsetX,
  environmentOffsetY: state.environmentOffsetY,
});

const mapDispatchToProps = (dispatch) => ({
  addLevelCollision: (currentState, collision) =>
    dispatch(addLevelCollision(currentState, collision)),
});

function MossyAsset({
  state,
  assetX = 0,
  assetY = 0,
  x,
  y,
  ctx,
  updateTick,
  windowSize,
  environmentOffsetX,
  environmentOffsetY,
  addLevelCollision,
}) {
  const mossy = useImageLoader("/rsc/tileset/mossy.png");
  if (mossy)
    ctx.drawImage(
      mossy.img,
      assetX * 512,
      assetY * 512,
      512,
      512,
      x + environmentOffsetX,
      y + environmentOffsetY,
      512 / 4,
      512 / 4
    );
  // ctx.fillRect(
  //   x + environmentOffsetX,
  //   y + environmentOffsetY,
  //   512 / 4,
  //   512 / 4
  // );
  useEffect(() => {
    addLevelCollision(state, new Rectangle(x, y, 512 / 4, 512 / 4));
  }, []);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(MossyAsset);
