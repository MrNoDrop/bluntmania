import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { push } from "redux-first-routing";
import { useNavigate } from "react-router-dom";
import Title from "../../../gfx/mainMenuPage/title";
import useHowl from "../../../hooks/useHowl";
import Play from "../../../gfx/mainMenuPage/button/play";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({
  registerLoadCTX: () => dispatch(push("/")),
});

function MainMenuPage({ registerLoadCTX, ctx, updateTick, windowSize }) {
  const navigateTo = useNavigate();
  useEffect(() => {
    if (ctx === null) {
      registerLoadCTX();
      navigateTo("/");
    } else {
      ctx.fillStyle = "blue";
      ctx.rect(0, 0, windowSize.width, windowSize.height);
      ctx.fill();
    }
  }, [ctx, registerLoadCTX, navigateTo, updateTick, windowSize]);
  useHowl("http://localhost:8080/rsc/sounds/background/happy.wav", true);
  return (
    <>
      <Title title="Blunt Mania" />
      <Play />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuPage);
