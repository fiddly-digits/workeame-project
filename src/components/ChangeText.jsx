import { useEffect, useState } from "react";

export default function ChangeText() {
  const [textIndex, setTextIndex] = useState(0);

  const textOptions = [
    "Crea tu propio Micrositio",
    "Oferta tus Servicios",
    "Deja saber a tus clientes tu disponibildad",
    "Gestiona tus citas de manera sencilla",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-auto m-4 ">
        <div className="text-lg">
          {textOptions.map((text, index) => (
            <div
              key={index}
              className={`animated-text ${
                textIndex === index ? "show" : "hide"
              }`}
            >
              <p className="flex flex-row gap-2 justify-center font-oswald text-gray-500 tracking-widest font-light">
                <img src="/check.svg" alt="check" />
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
