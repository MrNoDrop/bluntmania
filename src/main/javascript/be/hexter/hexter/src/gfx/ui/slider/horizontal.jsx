import React, { useEffect, useState } from "react";
import { vmin } from "../../../tools/vScale";
import { connect } from "react-redux";
import useImageLoader from "../../../hooks/useImageLoader";
import { Rectangle } from "../../../tools/rectangle";
import { Howl } from "howler";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  uiSoundControllerVolume: state.uiSoundControllerVolume,
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
  disabled = false,
  uiSoundControllerVolume,
}) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [mouseExited, setMouseExited] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseLocked, setMouseLocked] = useState(false);
  const [val] = useState(value);
  const [minNobLocation, setMinNobLocation] = useState(undefined);
  const [maxNobLocation, setMaxNobLocation] = useState(undefined);
  const [nobSlideXLocation, setNobSlideXLocation] = useState(
    (vmin(width / 10) / 100) * val * 100
  );
  const [knobRectangle, setKnobRectangle] = useState(new Rectangle(0, 0, 0, 0));
  const sliderKnob = useImageLoader("/rsc/ui/slider/slider-knob.png");
  const sliderLeft = useImageLoader("/rsc/ui/slider/slider-left.png");
  const sliderMiddle = useImageLoader("/rsc/ui/slider/slider-middle.png");
  const sliderRight = useImageLoader("/rsc/ui/slider/slider-right.png");

  useEffect(() => {
    if (!sliderLeft) return;
    setMinNobLocation(vmin(x) + vmin(sliderLeft.width / 10) / 3);
    ctx.drawImage(
      sliderLeft.img,
      0,
      0,
      sliderLeft.width,
      sliderLeft.height,
      vmin(x) - vmin(0.8),
      vmin(y),
      vmin(sliderLeft.width / 10),
      vmin(sliderLeft.height / 10) / 4
    );
    if (!sliderRight) return;
    setMaxNobLocation(vmin(x) + vmin(width / 10));
    ctx.drawImage(
      sliderRight.img,
      0,
      0,
      sliderRight.width,
      sliderRight.height,
      vmin(x) + vmin(width / 10) + vmin(1.65),
      vmin(y),
      vmin(sliderRight.width / 10),
      vmin(sliderRight.height / 10) / 4
    );
    if (!sliderMiddle) return;
    const pieces = vmin(width / 10) / vmin(sliderMiddle.width / 10);
    for (let piece = Math.floor(pieces); piece > 0; --piece) {
      ctx.drawImage(
        sliderMiddle.img,
        0,
        0,
        sliderMiddle.width,
        sliderMiddle.height,
        vmin(x) + piece * vmin(sliderMiddle.width / 10),
        vmin(y),
        vmin((sliderMiddle.width + 4) / 10),
        vmin(sliderMiddle.height / 10) / 4
      );
    }
    if (sliderKnob && sliderLeft) {
      ctx.drawImage(
        sliderKnob.img,
        0,
        0,
        sliderKnob.width,
        sliderKnob.height,
        vmin(x) + vmin(sliderLeft.width / 10) / 3 + nobSlideXLocation,
        vmin(y) - vmin(0.3),
        vmin(sliderKnob.width / 10),
        vmin(sliderKnob.height / 10) / 4
      );
      setKnobRectangle(
        new Rectangle(
          vmin(x) + vmin(sliderLeft.width / 10) / 3 + nobSlideXLocation,
          vmin(y) - vmin(0.3),
          vmin(sliderKnob.width / 10),
          vmin(sliderKnob.height / 10) / 4
        )
      );
    }
  }, [ctx, updateTick]);
  useEffect(() => {
    const func = ({ clientX, clientY }) => {
      setMouseEntered(knobRectangle.contains(clientX, clientY));
      setMouseExited(!knobRectangle.contains(clientX, clientY));
    };
    window.addEventListener("mousemove", func);
    return () => {
      window.removeEventListener("mousemove", func);
    };
  }, [updateTick]);
  useEffect(() => {
    if (!disabled && !mouseLocked && (mouseEntered || mouseExited)) {
      new Howl({
        src: ["/rsc/sounds/buttons/hovering.wav"],
        volume: uiSoundControllerVolume,
        autoplay: true,
      });
    }
  }, [mouseEntered, mouseExited, mouseLocked]);
  useEffect(() => {
    const setMouseDownFunc = () => {
      setMouseDown(true);
    };
    const setMouseUpFunc = () => {
      setMouseDown(false);
      setMouseLocked(false);
    };
    window.addEventListener("mousedown", setMouseDownFunc);
    window.addEventListener("mouseup", setMouseUpFunc);
    return () => {
      window.removeEventListener("mousedown", setMouseDownFunc);
      window.removeEventListener("mouseup", setMouseUpFunc);
    };
  }, []);
  useEffect(() => {
    const func = ({ clientX, clientY }) => {
      if (mouseEntered && mouseDown) {
        setMouseLocked(true);
      }
      if (mouseLocked) {
        const value = clientX - minNobLocation - sliderKnob.width / 2;
        if (value < x + vmin(width / 10)) {
          setNobSlideXLocation(value);
        }
        if (value < x - vmin(sliderKnob.width / 2 / 10)) {
          setNobSlideXLocation(0);
        }
      }
    };
    window.addEventListener("mousemove", func);
    return () => {
      window.removeEventListener("mousemove", func);
    };
  }, [mouseEntered, mouseDown, updateTick]);
  useEffect(() => {
    const buffer = maxNobLocation - minNobLocation;
    getValue(nobSlideXLocation / buffer);
  }, [width, updateTick]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalSlider);
