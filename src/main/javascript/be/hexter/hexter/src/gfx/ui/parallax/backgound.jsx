import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

function ParallaxBackgound({ ctx, updateTick, windowSize, image, direction }) {
  const [imageDimension, setImageDimension] = useState({ width: 0, height: 0 });
  const [loadedImage, setLoadedImage] = useState(undefined);
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
    setOffset(direction === "right" ? offset + 1 : offset - 1);
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

export default connect(mapStateToProps)(ParallaxBackgound);
