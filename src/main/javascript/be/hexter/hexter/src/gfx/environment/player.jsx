import React, { useEffect, useState } from "react";
import { vmin } from "../../tools/vScale";
import { connect } from "react-redux";
import setEnvironmentOffsetX from "../../store/actions/set/environmentOffsetX";
import setEnvironmentOffsetY from "../../store/actions/set/environmentOffsetY";
import useKeydownListener from "../../hooks/useKeydownListener";
import { Rectangle } from "../../tools/rectangle";

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
  y = 0,
  ctx,
  updateTick,
  windowSize,
  environmentOffsetX,
  environmentOffsetY,
  setEnvironmentOffsetX,
  setEnvironmentOffsetY,
  level,
}) {
  const speed = 3;
  const keys = useKeydownListener();
  const [reachedLeftLimit, setReachedLeftLimit] = useState(false);
  const [reachedRightLimit, setReachedRightLimit] = useState(false);
  const [reachedTopLimit, setReachedTopLimit] = useState(false);
  const [reachedBottomLimit, setReachedBottomLimit] = useState(false);
  const [xLocation, setXLocation] = useState(x);
  const [yLocation, setYLocation] = useState(y);
  const [movingLeft, setMovingLeft] = useState(false);
  const [movingRight, setMovingRight] = useState(false);
  const [crouching, setCrouching] = useState(false);
  const [jumping, setJumping] = useState(false);
  const xPos = xLocation + -environmentOffsetX;
  const yPos = yLocation + -environmentOffsetY;

  const collidesTop =
    level.collisions
      .map((rectangle) =>
        rectangle.collidesRect(new Rectangle(xPos, yPos - speed, 100, 200))
      )
      .filter((collides) => collides).length > 0;
  const collidesBottom =
    level.collisions
      .map((rectangle) =>
        rectangle.collidesRect(new Rectangle(xPos, yPos + speed, 100, 200))
      )
      .filter((collides) => collides).length > 0;
  const collidesRight =
    level.collisions
      .map((rectangle) =>
        rectangle.collidesRect(
          new Rectangle(xPos + speed, yPos - speed, 100, 200)
        )
      )
      .filter((collides) => collides).length > 0;
  const collidesLeft =
    level.collisions
      .map((rectangle) =>
        rectangle.collidesRect(
          new Rectangle(xPos - speed, yPos - speed, 100, 200)
        )
      )
      .filter((collides) => collides).length > 0;
  // move right
  useEffect(() => {
    setReachedRightLimit(
      -(environmentOffsetX - speed) > level.width - windowSize.width
    );
    if (keys.d === true && !collidesRight) {
      setMovingRight(true);
      if (reachedRightLimit) {
        if (xLocation + speed < windowSize.width - 100) {
          setXLocation(xLocation + speed);
        } else if (xLocation + speed >= windowSize.width - 100) {
          setXLocation(windowSize.width - 100);
        }
      } else if (xLocation < windowSize.width / 2) {
        setXLocation(xLocation + speed);
      } else
        setEnvironmentOffsetX(
          -(environmentOffsetX - speed) > level.width - windowSize.width
            ? -level.width + windowSize.width
            : environmentOffsetX - speed
        );
    } else if (movingRight) {
      setMovingRight(false);
    }
  }, [keys, updateTick]);

  //move left
  useEffect(() => {
    setReachedLeftLimit(environmentOffsetX + speed > 0);
    if (keys.a === true && !collidesLeft) {
      setMovingLeft(true);
      if (reachedLeftLimit) {
        if (xLocation - speed >= 0) {
          setXLocation(xLocation - speed);
        } else if (xLocation - speed < 0) {
          setXLocation(0);
        }
      } else if (xLocation > windowSize.width / 2) {
        setXLocation(xLocation - speed);
      } else
        setEnvironmentOffsetX(
          environmentOffsetX + speed > 0 ? 0 : environmentOffsetX + speed
        );
    } else if (movingLeft) {
      setMovingLeft(false);
    }
  }, [keys, updateTick]);

  // crouch
  useEffect(() => {
    if (keys.s === true && !crouching && !jumping) {
      setCrouching(true);
    } else if ((keys.s === false && crouching) || jumping) {
      setCrouching(false);
    }
  }, [keys, updateTick]);

  //falling
  useEffect(() => {
    if (!collidesBottom) {
      setJumping(false);
      setReachedBottomLimit(
        !(-(environmentOffsetY - speed) < level.height - windowSize.height)
      );
      if (!reachedBottomLimit) {
        setEnvironmentOffsetY(environmentOffsetY - speed);
      } else if (yLocation + speed < windowSize.height - 200) {
        setYLocation(yLocation + speed);
      }
    }
  }, [updateTick]);

  //jumping
  useEffect(() => {
    if (keys[" "] === true && !collidesTop) {
      setJumping(true);
      if (yPos > level.height - windowSize.height / 2) {
        setYLocation(yLocation - speed * 2);
      } else {
        setEnvironmentOffsetY(environmentOffsetY + speed * 2);
      }
    }
  }, [updateTick]);
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
  if (crouching) {
    ctx.fillRect(xLocation, yLocation + 100, 100, 100);
  } else {
    ctx.fillRect(xLocation, yLocation, 100, 200);
  }

  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
