import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { push } from "redux-first-routing";
import { vmin } from "../../tools/vScale";
import { Rectangle } from "../../tools/rectangle";
import { Howl } from "howler";
import useImageLoader from "../../hooks/useImageLoader";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
  uiSoundControllerVolume: state.uiSoundControllerVolume,
});

const mapDispatchToProps = (dispatch) => ({});

function ImageSwitchButton({
  ctx,
  updateTick,
  windowSize,
  x,
  y,
  disabled = false,
  clickSound,
  getMuted,
  initMuted,
  savedVolume,
  getSavedVolume: saveVolume,
  uiSoundControllerVolume,
}) {
  const [currentVolume] = useState(savedVolume);
  const [muted, setMuted] = useState(initMuted);
  const [mouseEntered, setMouseEntered] = useState(false);
  const [mouseExited, setMouseExited] = useState(false);
  const [rectangle, setRectangle] = useState(new Rectangle(0, 0, 0, 0));
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const func = ({ clientX, clientY }) => {
      setMouseEntered(rectangle.contains(clientX, clientY));
      setMouseExited(!rectangle.contains(clientX, clientY));
    };
    window.addEventListener("mousemove", func);
    return () => {
      window.removeEventListener("mousemove", func);
    };
  }, [updateTick]);
  const defaultImage = useImageLoader(
    "/rsc/sounds/buttons/images/not-muted.png"
  );
  const hoverDefaultImage = useImageLoader(
    "/rsc/sounds/buttons/images/not-muted-hover.png"
  );
  const clickedImage = useImageLoader("/rsc/sounds/buttons/images/muted.png");
  const hoverClickedImage = useImageLoader(
    "/rsc/sounds/buttons/images/muted-hover.png"
  );
  useEffect(() => {
    setImages([
      defaultImage,
      hoverDefaultImage,
      clickedImage,
      hoverClickedImage,
    ]);
  }, [defaultImage, hoverDefaultImage, clickedImage, hoverClickedImage]);
  useEffect(() => {
    if (!images[currentImage]) return;
    const { img, width, height } = images[currentImage];
    ctx.drawImage(
      img,
      0,
      0,
      width,
      height,
      vmin(x),
      vmin(y),
      vmin(width / 10) / 5,
      vmin(height / 10) / 5
    );
    setRectangle(new Rectangle(vmin(x), vmin(y), width / 5, height / 5));
  }, [updateTick]);
  useEffect(() => {
    const func = () => {
      if (!disabled && mouseEntered) {
        new Howl({
          src: [clickSound || "/rsc/sounds/buttons/onClick.wav"],
          volume: uiSoundControllerVolume,
          autoplay: true,
        });
        if (!disabled) {
          setMuted(!muted);
          getMuted(!muted);
        }
      }
    };
    window.addEventListener("click", func);
    return () => {
      window.removeEventListener("click", func);
    };
  }, [updateTick, disabled, mouseEntered, clickSound]);
  useEffect(() => {
    if (!disabled && (mouseEntered || mouseExited)) {
      new Howl({
        src: ["/rsc/sounds/buttons/hovering.wav"],
        volume: uiSoundControllerVolume,
        autoplay: true,
      });
    }
  }, [mouseEntered, mouseExited]);
  useEffect(() => {
    if (muted) {
      saveVolume(0);
    } else {
      saveVolume(currentVolume);
    }
  }, [muted, updateTick]);
  useEffect(() => {
    if (!muted && !mouseEntered) {
      setCurrentImage(0);
    }
    if (!muted && mouseEntered) {
      setCurrentImage(1);
    }
    if (muted && !mouseEntered) {
      setCurrentImage(2);
    }
    if (muted && mouseEntered) {
      setCurrentImage(3);
    }
  }, [muted, mouseEntered]);
  return <></>;
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageSwitchButton);
