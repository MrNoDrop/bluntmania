import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import useCheckAuthenticationToken from "../../hooks/useCheckAuthenticationToken";
import setCanvasContext2D from "../../store/actions/set/canvas/context2D";

const mapStateToProps = ({ state }) => ({
  csrfToken: state.cookie.csrfToken,
  fingerprint: state.fingerprint,
  authenticationToken: state.cookie["authentication-token"],
  outerWindow: state.window.outer,
});

const mapDispatchToProps = (dispatch) => ({
  setContext2D: (context2D) => dispatch(setCanvasContext2D(context2D)),
});

function LandingPage({
  setContext2D,
  outerWindow,
  csrfToken,
  fingerprint,
  authenticationToken,
}) {
  useCheckAuthenticationToken(csrfToken, fingerprint, authenticationToken);
  const canvasRef = useRef(undefined);
  useEffect(() => {
    const context2D = canvasRef.current.getContext("2d");
    setContext2D(context2D);
  }, [setContext2D, canvasRef]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={outerWindow.width}
        height={outerWindow.height}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
