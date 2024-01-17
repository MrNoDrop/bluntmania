import { Howl } from "howler";
import { useEffect } from "react";

const useHowl = (src, loop) => {
  useEffect(() => {
    var sound = new Howl({
      src: ["http://localhost:8080/rsc/sounds/background/happy.wav"],
      autoplay: true,
      loop,
    });
    return () => {
      sound.stop();
    };
  }, [src, loop]);
};

export default useHowl;
