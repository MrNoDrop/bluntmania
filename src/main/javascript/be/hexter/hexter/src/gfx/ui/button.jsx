import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { push } from "redux-first-routing";
import { vmin } from "../../tools/vScale";
import { Rectangle } from "../../tools/rectangle";
import { Howl } from "howler";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  uiSoundControllerVolume: state.uiSoundControllerVolume,
});

const mapDispatchToProps = (dispatch) => ({});

function Button({
  text,
  ctx,
  updateTick,
  windowSize,
  defaultColor,
  hoverColor,
  disabledColor,
  x,
  y,
  onClick,
  fontSize,
  font,
  clickSound,
  rectangleXOffset = 0,
  rectangleYOffset = 0,
  disabled = false,
  uiSoundControllerVolume,
}) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [mouseExited, setMouseExited] = useState(false);
  const [rectangle, setRectangle] = useState(
    new Rectangle(
      x + vmin(rectangleXOffset),
      y + vmin(fontSize / 10) + vmin(rectangleYOffset),
      ctx.measureText(text).width + vmin(1),
      ctx.measureText(text).actualBoundingBoxAscent +
        ctx.measureText(text).actualBoundingBoxDescent
    )
  );
  useEffect(() => {
    ctx.font = `${fontSize}vmin ${font}`;
    if (disabled) {
      ctx.fillStyle = disabledColor;
    } else if (mouseEntered) {
      ctx.fillStyle = hoverColor;
    } else {
      ctx.fillStyle = defaultColor;
    }
    ctx.fillText(
      text,
      x,
      y +
        (ctx.measureText(text).actualBoundingBoxAscent +
          ctx.measureText(text).actualBoundingBoxDescent / 2)
    );
    setRectangle(
      new Rectangle(
        x + vmin(rectangleXOffset),
        y + vmin(fontSize / 10) + vmin(rectangleYOffset),
        ctx.measureText(text).width,
        ctx.measureText(text).actualBoundingBoxAscent +
          ctx.measureText(text).actualBoundingBoxDescent
      )
    );
  }, [ctx, updateTick, windowSize]);
  useEffect(() => {
    const func = ({ clientX, clientY }) => {
      setMouseEntered(rectangle.contains(clientX, clientY));
      setMouseExited(!rectangle.contains(clientX, clientY));
    };
    window.addEventListener("mousemove", func);
    return () => {
      window.removeEventListener("mousemove", func);
    };
  }, [updateTick]);
  useEffect(() => {
    const func = () => {
      if (!disabled && mouseEntered) {
        new Howl({
          src: [clickSound || "/rsc/sounds/buttons/onClick.wav"],
          volume: uiSoundControllerVolume,
          autoplay: true,
        });
        if (!disabled) {
          eval(onClick);
        }
      }
    };
    window.addEventListener("click", func);
    return () => {
      window.removeEventListener("click", func);
    };
  }, [updateTick, disabled, mouseEntered, clickSound, onClick]);
  useEffect(() => {
    if (!disabled && (mouseEntered || mouseExited)) {
      new Howl({
        src: ["/rsc/sounds/buttons/hovering.wav"],
        volume: uiSoundControllerVolume,
        autoplay: true,
      });
    }
  }, [mouseEntered, mouseExited]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
