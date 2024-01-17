import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import useCheckAuthenticationToken from "../../hooks/useCheckAuthenticationToken";
import setCanvasContext2D from "../../store/actions/set/canvas/context2D";
import { push } from "redux-first-routing";
import { useNavigate } from "react-router-dom";

const mapStateToProps = ({ state }) => ({
  csrfToken: state.cookie.csrfToken,
  fingerprint: state.fingerprint,
  authenticationToken: state.cookie["authentication-token"],
  innerWindow: state.window.inner,
  updateTick: state.updateTick,
});

const mapDispatchToProps = (dispatch) => ({
  setContext2D: (context2D) => dispatch(setCanvasContext2D(context2D)),
  registerGoToMainMenuPage: () => dispatch(push("/main-menu")),
});

function GamePage({
  setContext2D,
  innerWindow,
  csrfToken,
  fingerprint,
  authenticationToken,
  registerGoToMainMenuPage,
  updateTick,
}) {
  useCheckAuthenticationToken(csrfToken, fingerprint, authenticationToken);
  const navigateTo = useNavigate();
  const canvasRef = useRef(undefined);
  useEffect(() => {
    const context2D = canvasRef.current.getContext("2d");
    setContext2D(context2D);
    registerGoToMainMenuPage();
    navigateTo("/main-menu");
  }, [setContext2D, canvasRef, registerGoToMainMenuPage, navigateTo]);
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
