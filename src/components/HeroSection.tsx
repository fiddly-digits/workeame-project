import { useState, useEffect } from 'react';
import BottomButtons from './BottomButtons';
import WorkeaTitle from './WorkeaTitle';

export default function HeroSection() {
  const colors = ['bg-primary', 'bg-secondary', 'bg-fourth'];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 4000); // Cambiar el color cada 3 segundos (3000ms)

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const currentColorClass = colors[currentColorIndex];

  return (
    <>
      <section
        className={`flex items-center justify-center ${currentColorClass} transition-all duration-[11000ms] ease-linear`}
      >
        <article className='container flex flex-col items-center justify-center h-screen min-h-screen gap-5 px-5 grow lg:px-24'>
          <WorkeaTitle></WorkeaTitle>
          <p className='text-xl text-center font-roboto lg:text-3xl'>
            Somos más que una <span className='font-bold'>plataforma</span>;
            somos el enlace entre quienes{' '}
            <span className='font-bold'>buscan</span> servicios y aquellos que
            los <span className='font-bold'>ofrecen</span>.
          </p>
          <BottomButtons nextTitle='QUIENES SOMOS' reference='second' />
        </article>
      </section>
    </>
  );
}
