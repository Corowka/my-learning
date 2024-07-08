import { useState, useEffect } from "react";

export default function useMousePos() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const offsetX = window.pageXOffset || document.documentElement.scrollLeft;
      const offsetY = window.pageYOffset || document.documentElement.scrollTop;

      setCoords({
        x: clientX + offsetX,
        y: clientY + offsetY,
      });
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, []);

  return coords;
}
