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
  x = 0,
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
  const [defaultXlocation] = useState(x + windowSize.width / 2);
  const [xLocation, setXLocation] = useState(defaultXlocation);
  const [movingLeft, setMovingLeft] = useState(false);
  const [movingRight, setMovingRight] = useState(false);
  const [crouching, setCrouching] = useState(false);
  const [falling, setFalling] = useState(false);

  useHorizontalMovement({
    setReachedLeftLimit,
    environmentOffsetX,
    speed,
    setReachedRightLimit,
    level,
    windowSize,
    keys,
    setMovingRight,
    reachedRightLimit,
    xLocation,
    setXLocation,
    defaultXlocation,
    movingRight,
    setMovingLeft,
    reachedLeftLimit,
    movingLeft,
  });
  useEffect(() => {
    if (keys.s === true && !crouching) {
      setCrouching(true);
    } else if (keys.s === false && crouching) {
      setCrouching(false);
    }
  }, [keys]);
  if (!falling) {
    if (movingLeft) {
      ctx.fillStyle = "red";
    }
    if (movingLeft && crouching) {
      ctx.fillStyle = "orange";
    }
    if (movingRight) {
      ctx.fillStyle = "blue";
    }
    if (movingRight && crouching) {
      ctx.fillStyle = "yellow";
    }
    if (!movingLeft && !movingRight && !crouching) {
      ctx.fillStyle = "grey";
    }
    if (!movingLeft && !movingRight && crouching) {
      ctx.fillStyle = "black";
    }
  }
  ctx.fillRect(xLocation, 0 + windowSize.height / 2, 100, 100);

  return <></>;
}

function useHorizontalMovement({
  setReachedLeftLimit,
  environmentOffsetX,
  speed,
  setReachedRightLimit,
  level,
  windowSize,
  keys,
  setMovingRight,
  reachedRightLimit,
  xLocation,
  setXLocation,
  defaultXlocation,
  movingRight,
  setMovingLeft,
  reachedLeftLimit,
  movingLeft,
}) {
  useEffect(() => {
    setReachedLeftLimit(environmentOffsetX + speed > 0);
    setReachedRightLimit(
      -(environmentOffsetX - speed) > level.width - windowSize.width
    );
    if (keys.d === true) {
      setMovingRight(true);
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
    } else if (movingRight) {
      setMovingRight(false);
    } else if (keys.a === true) {
      setMovingLeft(true);
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
    } else if (movingLeft) {
      setMovingLeft(false);
    }
  }, [keys]);
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);
