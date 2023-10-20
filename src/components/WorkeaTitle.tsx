import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';

export default function WorkeaTitle() {
  const backgroundClasses = useMemo(
    () => [
      'bg-clip-text-image-landing-black',
      'bg-clip-text-image-landing-second',
      'bg-clip-text-image-landing-first'
    ],
    []
  );
  const [backgroundText, setBackgroundText] = useState(backgroundClasses[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalDuration = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % backgroundClasses.length;
      const nextBackgroundText = backgroundClasses[nextIndex];

      setBackgroundText(nextBackgroundText);
      setCurrentIndex(nextIndex);
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, [backgroundClasses, currentIndex]);

  return (
    <>
      <div className='font-oswald flex justify-center items-center h-[400px] w-auto'>
        <h1
          className={clsx(
            backgroundText,
            ' font-bold font-oswald transition-all duration-[11000ms] ease-linear'
          )}
        >
          W<span className='hidden lg:inline'>orkea</span>
        </h1>
      </div>
    </>
  );
}
