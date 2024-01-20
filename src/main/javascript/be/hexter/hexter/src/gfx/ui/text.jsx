import React, { useEffect } from "react";
import { vmin } from "../../tools/vScale";
import { connect } from "react-redux";
import "./rastaText.scss";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function Text({
  text,
  x,
  y,
  font,
  fontSize,
  color,
  ctx,
  updateTick,
  windowSize,
}) {
  useEffect(() => {
    ctx.font = `${fontSize}vmin ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }, [color, ctx, font, fontSize, text, updateTick, windowSize, x, y]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);
