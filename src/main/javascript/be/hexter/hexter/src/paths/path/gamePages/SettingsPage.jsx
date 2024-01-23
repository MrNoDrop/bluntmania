import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../gfx/ui/button";
import RastaText from "../../../gfx/ui/RastaText";
import { vmin } from "../../../tools/vScale";
import Text from "../../../gfx/ui/text";
import MuteButton from "../../../gfx/ui/muteButton";
import setBackgroundSoundControllerMuted from "../../../store/actions/set/controller/backgroundSoundMuted";
import setBackgroundSoundControllerVolume from "../../../store/actions/set/controller/backgroundSoundVolume";
import HorizontalSlider from "../../../gfx/ui/slider/horizontal";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  backgroundSoundController: state.backgroundSoundController,
  backgroundSoundControllerVolume: state.backgroundSoundControllerVolume,
  backgroundSoundControllerMuted: state.backgroundSoundControllerMuted,
});

const mapDispatchToProps = (dispatch) => ({
  setBackgroundSoundControllerMuted: (muted) =>
    dispatch(setBackgroundSoundControllerMuted(muted)),
  setBackgroundSoundControllerVolume: (volume) =>
    dispatch(setBackgroundSoundControllerVolume(volume)),
});

function SettingsPage({
  ctx,
  updateTick,
  windowSize,
  backgroundSoundController,
  backgroundSoundControllerMuted,
  setBackgroundSoundControllerMuted,
  backgroundSoundControllerVolume,
  setBackgroundSoundControllerVolume,
}) {
  const navigateTo = useNavigate();
  window.navigateTo = navigateTo;
  useEffect(() => {
    if (!ctx) {
      navigateTo("/");
    } else {
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    }
  }, [ctx, navigateTo, updateTick, windowSize]);
  useEffect(() => {
    backgroundSoundController.volume(backgroundSoundControllerVolume);
  }, [backgroundSoundController, backgroundSoundControllerVolume]);
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
      <Text
        text="background song volume:"
        font="fippsregular"
        fontSize={3}
        color="black"
        x={vmin(5)}
        y={vmin(10)}
      />
      <MuteButton
        x={68.0}
        y={3.4}
        savedVolume={backgroundSoundControllerVolume}
        getSavedVolume={setBackgroundSoundControllerVolume}
        initMuted={backgroundSoundControllerMuted}
        getMuted={setBackgroundSoundControllerMuted}
      />
      <HorizontalSlider
        width={600}
        x={5}
        y={12}
        value={backgroundSoundControllerVolume}
        getValue={setBackgroundSoundControllerVolume}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
