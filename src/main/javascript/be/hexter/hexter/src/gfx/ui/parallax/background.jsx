import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

function ParallaxBackground({
  ctx,
  updateTick,
  windowSize,
  image,
  direction,
  speed = 1,
  slowerBy = 1,
}) {
  const [imageDimension, setImageDimension] = useState({ width: 0, height: 0 });
  const [loadedImage, setLoadedImage] = useState(undefined);
  const [tick, setTick] = useState(0);
  const [offset, setOffset] = useState(
    direction === "right" ? 0 : windowSize.width
  );
  useEffect(() => {
    var img = new Image();
    img.src = image;
    img.onload = function () {
      setImageDimension({ width: this.width, height: this.height });
    };
    setLoadedImage(img);
  }, [ctx, image]);
  useEffect(() => {
    setTick(tick + 1);
    if (tick % slowerBy === 0) {
      setOffset(direction === "right" ? offset + speed : offset - speed);
    }
    if (loadedImage) {
      ctx.drawImage(
        loadedImage,
        0,
        0,
        imageDimension.width,
        imageDimension.height,
        -windowSize.width + offset,
        0,
        windowSize.width,
        windowSize.height
      );
      ctx.drawImage(
        loadedImage,
        0,
        0,
        imageDimension.width,
        imageDimension.height,
        0 + offset,
        0,
        windowSize.width,
        windowSize.height
      );
    }
    if (offset > windowSize.width || offset < 0) {
      setOffset(direction === "right" ? 0 : windowSize.width);
    }
  }, [loadedImage, updateTick, ctx]);

  return <></>;
}

export default connect(mapStateToProps)(ParallaxBackground);
