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

function SettingsPage({ ctx, updateTick, windowSize }) {
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
      <RastaText text="Settings" x={vmin(5)} y={windowSize.height - vmin(10)} />
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
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
