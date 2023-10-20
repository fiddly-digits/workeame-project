import { useEffect, useState } from 'react';

export default function ChangeText() {
  const [textIndex, setTextIndex] = useState(0);

  const textOptions = [
    'Crea tu propio Micrositio',
    'Oferta tus Servicios',
    'Deja saber a tus clientes tu disponibildad',
    'Gestiona tus citas de manera sencilla'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [textOptions.length]);

  return (
    <>
      <div className='flex items-center justify-center h-auto m-4 '>
        <div className='text-lg'>
          {textOptions.map((text, index) => (
            <div
              key={index}
              className={`animated-text ${
                textIndex === index ? 'show' : 'hide'
              }`}
            >
              <p className='flex flex-row justify-center gap-2 font-light tracking-widest text-gray-500 font-oswald'>
                <img src='/check.svg' alt='check' />
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
