import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { push } from "redux-first-routing";
import Title from "../../../gfx/mainMenuPage/title";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function ChooseLevelPage({ ctx, updateTick, windowSize }) {
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!ctx) {
      navigateTo("/");
    } else {
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    }
  }, [ctx, navigateTo, updateTick, windowSize]);
  return (
    <>
      <Title />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLevelPage);
