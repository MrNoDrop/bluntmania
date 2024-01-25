import React, { useEffect, useState } from "react";
import { vmin } from "../../tools/vScale";
import { connect } from "react-redux";
import useImageLoader from "../../hooks/useImageLoader";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  environmentOffsetX: state.environmentOffsetX,
  environmentOffsetY: state.environmentOffsetY,
});

const mapDispatchToProps = (dispatch) => ({});

function MossyAsset({
  assetX = 0,
  assetY = 0,
  x,
  y,
  ctx,
  updateTick,
  windowSize,
  environmentOffsetX,
  environmentOffsetY,
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
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(MossyAsset);
