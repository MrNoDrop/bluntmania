import React, { useEffect } from "react";
import { connect } from "react-redux";
import { push } from "redux-first-routing";
import { useNavigate } from "react-router-dom";
import Title from "../../../gfx/mainMenuPage/title";
import useHowl from "../../../hooks/useHowl";
import Button from "../../../gfx/ui/button";
import { vmin } from "../../../tools/vScale";

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
  window.navigateTo = navigateTo;
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
      <Button
        font="papercut-regular"
        fontSize={10}
        text="play"
        defaultColor="grey"
        hoverColor="green"
        x={windowSize.width / 2 - vmin(14)}
        y={vmin(40)}
        onClick={"window.navigateTo('/choose-level')"}
      />
      <Button
        font="papercut-regular"
        fontSize={10}
        text="log-out"
        defaultColor="grey"
        hoverColor="red"
        x={windowSize.width - vmin(36)}
        y={windowSize.height - vmin(12)}
        onClick={'document.cookie = "authentication-token=null"'}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuPage);
