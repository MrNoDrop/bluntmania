import { useState, useEffect } from "react";
export default function useImageLoader(imageSource) {
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    var img = new Image();
    img.src = imageSource;
    img.onload = function () {
      setImage({ img, width: this.width, height: this.height });
    };
  }, [imageSource]);
  return image;
}
