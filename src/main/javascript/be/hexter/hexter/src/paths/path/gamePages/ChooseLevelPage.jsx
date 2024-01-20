import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../gfx/ui/button";
import RastaText from "../../../gfx/ui/RastaText";
import { vmin } from "../../../tools/vScale";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function ChooseLevelPage({ ctx, updateTick, windowSize }) {
  const navigateTo = useNavigate();
  window.navigateTo = navigateTo;
  useEffect(() => {
    if (!ctx) {
      navigateTo("/");
    } else {
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    }
  }, [ctx, navigateTo, updateTick, windowSize]);
  return (
    <>
      <RastaText
        text="Choose Level"
        x={windowSize.width / 2 - vmin(82)}
        y={vmin(20)}
      />

      <Button
        font="papercut-regular"
        fontSize={10}
        text="return"
        defaultColor="grey"
        hoverColor="green"
        x={windowSize.width - vmin(36)}
        y={windowSize.height - vmin(12)}
        onClick={"navigateTo(-1)"}
      />

      <Button
        font="arcade-regular"
        fontSize={10}
        text="Level 1"
        defaultColor="grey"
        hoverColor="green"
        x={vmin(20)}
        y={vmin(30)}
        onClick={"navigateTo('/choose-level/level-1')"}
        rectangleYOffset={-2.3}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLevelPage);
