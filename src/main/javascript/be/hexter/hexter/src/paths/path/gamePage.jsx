import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import useCheckAuthenticationToken from "../../hooks/useCheckAuthenticationToken";
import setCanvasContext2D from "../../store/actions/set/canvas/context2D";
import { useNavigate } from "react-router-dom";
import useHowl from "../../hooks/useHowl";
import setBackgroundSoundController from "../../store/actions/set/controller/backgroundSound";

const mapStateToProps = ({ state }) => ({
  csrfToken: state.cookie.csrfToken,
  fingerprint: state.fingerprint,
  authenticationToken: state.cookie["authentication-token"],
  innerWindow: state.window.inner,
  updateTick: state.updateTick,
  context2D: state.context2D,
});

const mapDispatchToProps = (dispatch) => ({
  setContext2D: (context2D) => dispatch(setCanvasContext2D(context2D)),
  setBackgroundSoundController: (sound) =>
    dispatch(setBackgroundSoundController(sound)),
});

function GamePage({
  context2D,
  setContext2D,
  innerWindow,
  csrfToken,
  fingerprint,
  authenticationToken,
  updateTick,
}) {
  useCheckAuthenticationToken(csrfToken, fingerprint, authenticationToken);
  const navigateTo = useNavigate();
  const canvasRef = useRef(undefined);
  useEffect(() => {
    const context2D_ = canvasRef.current.getContext("2d");
    setContext2D(context2D_);
    if (window.location.pathname === "/") {
      navigateTo("/main-menu");
    }
  }, [setContext2D, context2D, canvasRef, navigateTo]);
  const backgroundSound = useHowl("/rsc/sounds/background/happy.wav", true);
  useEffect(() => {
    setBackgroundSoundController(backgroundSound);
  }, [backgroundSound]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={innerWindow.width}
        height={innerWindow.height}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
