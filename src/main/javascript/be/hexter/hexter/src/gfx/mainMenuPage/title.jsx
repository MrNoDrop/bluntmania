import React, { useEffect, useState } from "react";
import { vmin } from "../../tools/vScale";
import { connect } from "react-redux";
import "./title.scss";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function Title({ title, ctx, updateTick, windowSize }) {
  const [titleColor, setTitleColor] = useState(0);
  useEffect(() => {
    ctx.font = "15vmin fippsregular";
    switch (titleColor) {
      default:
        ctx.fillStyle = "white";
        break;
      case 0:
        ctx.fillStyle = "red";
        break;
      case 1:
        ctx.fillStyle = "yellow";
        break;
      case 2:
        ctx.fillStyle = "green";
        break;
    }
    ctx.fillText(
      title,
      windowSize.width / 2 - ctx.measureText(title).width / 2,
      vmin(30)
    );
  }, [ctx, updateTick, windowSize]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleColor(titleColor + 1 >= 3 ? 0 : titleColor + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [titleColor]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);
