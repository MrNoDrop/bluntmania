import React, { useEffect, useState } from "react";
import { vmin } from "../../tools/vScale";
import { connect } from "react-redux";
import setEnvironmentOffsetX from "../../store/actions/set/environmentOffsetX";
import setEnvironmentOffsetY from "../../store/actions/set/environmentOffsetY";
import useKeydownListener from "../../hooks/useKeydownListener";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  environmentOffsetX: state.environmentOffsetX,
  environmentOffsetY: state.environmentOffsetY,
});

const mapDispatchToProps = (dispatch) => ({
  setEnvironmentOffsetX: (x) => dispatch(setEnvironmentOffsetX(x)),
  setEnvironmentOffsetY: (y) => dispatch(setEnvironmentOffsetY(y)),
});

function Player({
  x,
  y,
  ctx,
  updateTick,
  windowSize,
  environmentOffsetX,
  environmentOffsetY,
  setEnvironmentOffsetX,
  setEnvironmentOffsetY,
}) {
  const keys = useKeydownListener();
  console.log(keys);
  useEffect(() => {}, []);
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
