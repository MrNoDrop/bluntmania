import { Howl } from "howler";
import { useEffect, useState } from "react";

const useHowl = (src, loop, volume) => {
  const [sound_, setSound] = useState(undefined);
  useEffect(() => {
    var sound = new Howl({
      src: ["http://localhost:8080/rsc/sounds/background/happy.wav"],
      autoplay: true,
      volume,
      loop,
    });
    setSound(sound);
    return () => {
      sound.stop();
    };
  }, [src, loop]);
  return sound_;
};

export default useHowl;
