import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { push } from "redux-first-routing";
import { vmin } from "../../../tools/vScale";
import { Rectangle } from "../../../tools/rectangle";
import "./play.scss";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function Button({ ctx, updateTick, windowSize }) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [rectangle, setRectangle] = useState(
    new Rectangle(
      windowSize.width / 2 - ctx.measureText("play").width / 2,
      vmin(38),
      ctx.measureText("play").width + vmin(1),
      ctx.measureText("play").actualBoundingBoxAscent +
        ctx.measureText("play").actualBoundingBoxDescent
    )
  );
  useEffect(() => {
    ctx.font = "10vmin pixels";
    if (mouseEntered) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "grey";
    }
    ctx.fillText(
      "play",
      windowSize.width / 2 - ctx.measureText("play").width / 2,
      vmin(45)
    );
    setRectangle(
      new Rectangle(
        windowSize.width / 2 - ctx.measureText("play").width / 2,
        vmin(38),
        ctx.measureText("play").width,
        ctx.measureText("play").actualBoundingBoxAscent +
          ctx.measureText("play").actualBoundingBoxDescent
      )
    );
  }, [ctx, updateTick, windowSize]);
  useEffect(() => {
    const func = ({ clientX, clientY }) => {
      setMouseEntered(rectangle.contains(clientX, clientY));
    };
    window.addEventListener("mousemove", func);
    return () => {
      window.removeEventListener("mousemove", func);
    };
  }, [updateTick]);
  useEffect(() => {
    const func = () => {
      if (mouseEntered) {
        console.log("clicked");
      }
    };
    window.addEventListener("click", func);
    return () => {
      window.removeEventListener("click", func);
    };
  }, [updateTick]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
