import { useState, useEffect } from "react";

const useKeydownListener = () => {
  const [keys, setKeys] = useState({});
  useEffect(() => {
    window.onkeydown = window.onkeyup = function (e) {
      const keysCopy = { ...keys };
      keysCopy[e.key.toLowerCase()] = e.type === "keydown";
      setKeys(keysCopy);
    };
    return () => {
      window.onkeydown = window.onkeyup = undefined;
    };
  }, [keys]);
  return keys;
};

export default useKeydownListener;
