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
  level: state.level,
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
  level,
}) {
  const speed = 10;
  const keys = useKeydownListener();
  const [reachedLeftLimit, setReachedLeftLimit] = useState(false);
  const [reachedRightLimit, setReachedRightLimit] = useState(false);
  const [defaultXlocation] = useState(0 + windowSize.width / 2);
  const [xLocation, setXLocation] = useState(defaultXlocation);

  useEffect(() => {
    setReachedLeftLimit(environmentOffsetX + speed > 0);
    setReachedRightLimit(
      -(environmentOffsetX - speed) > level.width - windowSize.width
    );
    if (keys.d === true) {
      if (reachedRightLimit) {
        if (xLocation + speed < windowSize.width - 100) {
          setXLocation(xLocation + speed);
        } else if (xLocation + speed >= windowSize.width - 100) {
          setXLocation(windowSize.width - 100);
        }
      } else if (xLocation < defaultXlocation) {
        setXLocation(xLocation + speed);
      } else
        setEnvironmentOffsetX(
          -(environmentOffsetX - speed) > level.width - windowSize.width
            ? -level.width + windowSize.width
            : environmentOffsetX - speed
        );
    }
    if (keys.a === true) {
      if (reachedLeftLimit) {
        if (xLocation - speed >= 0) {
          setXLocation(xLocation - speed);
        } else if (xLocation - speed < 0) {
          setXLocation(0);
        }
      } else if (xLocation > defaultXlocation) {
        setXLocation(xLocation - speed);
      } else
        setEnvironmentOffsetX(
          environmentOffsetX + speed > 0 ? 0 : environmentOffsetX + speed
        );
    }
  }, [keys]);
  ctx.fillRect(xLocation, 0 + windowSize.height / 2, 100, 100);

  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
