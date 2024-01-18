import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../../../gfx/mainMenuPage/title";
import Button from "../../../gfx/ui/button";
import { vmin } from "../../../tools/vScale";
import ParallaxBackground from "../../../gfx/ui/parallax/background";

const mapStateToProps = ({ state }) => ({
  ctx: state.context2D,
  updateTick: state.updateTick,
  windowSize: state.window.inner,
});

const mapDispatchToProps = (dispatch) => ({});

function MainMenuPage({ ctx, updateTick, windowSize }) {
  const navigateTo = useNavigate();
  window.navigateTo = navigateTo;
  useEffect(() => {
    if (!ctx) {
      navigateTo("/");
    } else {
      ctx.fillStyle = "blue";
      ctx.rect(0, 0, windowSize.width, windowSize.height);
      ctx.fill();
    }
  }, [ctx, navigateTo, updateTick, windowSize]);
  return (
    <>
      <ParallaxBackground
        image="http://localhost:8080/rsc/parallax/forest/layer_01.png"
        direction="left"
      />
      <ParallaxBackground
        image="http://localhost:8080/rsc/parallax/forest/layer_02.png"
        direction="right"
      />
      <ParallaxBackground
        image="http://localhost:8080/rsc/parallax/forest/layer_03.png"
        direction="right"
        speed={2}
      />
      <ParallaxBackground
        image="http://localhost:8080/rsc/parallax/forest/layer_04.png"
        direction="right"
        speed={3}
      />
      <ParallaxBackground
        image="http://localhost:8080/rsc/parallax/forest/layer_05.png"
        direction="right"
        speed={3}
      />
      <Title title="Blunt Mania" />
      <Button
        font="papercut-regular"
        fontSize={10}
        text="play"
        defaultColor="grey"
        hoverColor="green"
        x={windowSize.width / 2 - vmin(14)}
        y={vmin(40)}
        onClick={"navigateTo('/choose-level')"}
      />
      <Button
        font="papercut-regular"
        fontSize={10}
        text="log-out"
        defaultColor="grey"
        hoverColor="red"
        x={windowSize.width - vmin(36)}
        y={windowSize.height - vmin(12)}
        onClick={'document.cookie = "authentication-token=null"'}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuPage);
