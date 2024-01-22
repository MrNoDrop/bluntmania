import React, { useEffect, useState } from "react";
import { vmin } from "../../tools/vScale";
import { connect } from "react-redux";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function RastaText({ text, x, y, ctx, updateTick, windowSize }) {
  const [textColor, setTextColor] = useState(0);
  useEffect(() => {
    ctx.font = "15vmin fippsregular";
    switch (textColor) {
      default:
        ctx.fillStyle = "white";
        break;
      case 0:
        ctx.fillStyle = "green";
        break;
      case 1:
        ctx.fillStyle = "yellow";
        break;
      case 2:
        ctx.fillStyle = "red";
        break;
    }
    ctx.fillText(text, x, y);
  }, [ctx, updateTick, windowSize]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTextColor(textColor + 1 >= 3 ? 0 : textColor + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [textColor]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(RastaText);
