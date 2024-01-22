import React, { useEffect, useState } from "react";
import { vmin } from "../../../tools/vScale";
import { connect } from "react-redux";
import useImageLoader from "../../../hooks/useImageLoader";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function HorizontalSlider({
  value = 1.0,
  getValue,
  width,
  x,
  y,
  ctx,
  updateTick,
  windowSize,
}) {
  const [val, setVal] = useState(value);
  useEffect(() => {
    if (typeof getValue === "function") getValue(val);
  }, [val, getValue]);
  const sliderKnob = useImageLoader("/rsc/ui/slider/slider-knob.png");
  const sliderLeft = useImageLoader("/rsc/ui/slider/slider-left.png");
  const sliderMiddle = useImageLoader("/rsc/ui/slider/slider-middle.png");
  const sliderRight = useImageLoader("/rsc/ui/slider/slider-right.png");

  useEffect(() => {
    if (!sliderLeft) return;
    ctx.drawImage(
      sliderLeft.img,
      0,
      0,
      sliderLeft.width,
      sliderLeft.height,
      vmin(x),
      vmin(y),
      sliderLeft.width,
      sliderLeft.height / 4
    );
    if (!sliderRight) return;
    ctx.drawImage(
      sliderRight.img,
      0,
      0,
      sliderRight.width,
      sliderRight.height,
      vmin(x) + vmin(width),
      vmin(y),
      sliderRight.width,
      sliderRight.height / 4
    );
    if (!sliderMiddle) return;
    const pieces = vmin(width) / sliderMiddle.width;
    for (let piece = Math.floor(pieces); piece > 0; --piece) {
      ctx.drawImage(
        sliderMiddle.img,
        0,
        0,
        sliderMiddle.width,
        sliderMiddle.height,
        vmin(x) + piece * sliderMiddle.width,
        vmin(y),
        sliderMiddle.width + 1,
        sliderMiddle.height / 4
      );
    }
  }, [ctx, updateTick]);
  useEffect(() => {
    if (!sliderKnob) return;
    ctx.drawImage(
      sliderKnob.img,
      0,
      0,
      sliderKnob.width,
      sliderKnob.height,
      vmin(x) + sliderLeft.width / 3,
      vmin(y) - vmin(0.3),
      sliderKnob.width,
      sliderKnob.height / 4
    );
  }, [ctx, updateTick]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalSlider);
