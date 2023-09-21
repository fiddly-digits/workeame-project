import { useState, useEffect } from "react";
import clsx from "clsx";

export default function WorkeaTitle() {
  const [backgroundText, setBackgroundText] = useState("text-black"); // Clase de fondo inicial
  const backgroundClasses = [
    "bg-clip-text-image-landing-first",
    "bg-clip-text-image-landing-second",
  ];
  const intervalDuration = 5000;
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % backgroundClasses.length;
      const nextBackgroundText = backgroundClasses[nextIndex];

      setBackgroundText(nextBackgroundText);
      currentIndex = nextIndex;
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="font-oswald flex justify-center items-center h-[400px] w-auto">
        <h1
          className={clsx(
            backgroundText,
            "text-[400px] font-bold font-oswald transition-all duration-[20s] ease-linear"
          )}
        >
          W<span className="hidden lg:inline">orkea</span>
        </h1>
      </div>
    </>
  );
}
