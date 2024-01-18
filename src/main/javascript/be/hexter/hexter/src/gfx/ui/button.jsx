import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { push } from "redux-first-routing";
import { vmin } from "../../tools/vScale";
import { Rectangle } from "../../tools/rectangle";
import { Howl } from "howler";
import "./button.scss";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function Button({
  text,
  ctx,
  updateTick,
  windowSize,
  defaultColor,
  hoverColor,
  x,
  y,
  onClick,
  fontSize,
  font,
  clickSound,
}) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [mouseExited, setMouseExited] = useState(false);
  const [rectangle, setRectangle] = useState(
    new Rectangle(
      x,
      y + vmin(fontSize / 10),
      ctx.measureText(text).width + vmin(1),
      ctx.measureText(text).actualBoundingBoxAscent +
        ctx.measureText(text).actualBoundingBoxDescent
    )
  );
  useEffect(() => {
    ctx.font = `${fontSize}vmin ${font}`;
    if (mouseEntered) {
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
        x,
        y + vmin(fontSize / 10),
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
      if (mouseEntered) {
        new Howl({
          src: [
            clickSound ||
              "http://localhost:8080/rsc/sounds/buttons/onClick.wav",
          ],
          autoplay: true,
        });
        eval(onClick);
      }
    };
    window.addEventListener("click", func);
    return () => {
      window.removeEventListener("click", func);
    };
  }, [updateTick]);
  useEffect(() => {
    if (mouseEntered || mouseExited) {
      new Howl({
        src: ["http://localhost:8080/rsc/sounds/buttons/hovering.wav"],
        autoplay: true,
      });
    }
  }, [mouseEntered, mouseExited]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
