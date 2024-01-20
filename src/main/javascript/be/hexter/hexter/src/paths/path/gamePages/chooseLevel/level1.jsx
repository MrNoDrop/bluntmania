import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function Level1Page({ ctx, updateTick, windowSize }) {
  const navigateTo = useNavigate();
  window.navigateTo = navigateTo;
  useEffect(() => {
    if (!ctx) {
      navigateTo("/");
    } else {
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    }
  }, [ctx, navigateTo, updateTick, windowSize]);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Level1Page);
