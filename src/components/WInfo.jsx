import { useState, useEffect } from "react";

export default function WInfo() {
  const [text, setText] = useState("");
  const newText = [
    "Lo que nos hace diferentes es que tenemos todas estas herramientas en un solo sitio.",
    "Nuestra meta es unir a clientes y proveedores de forma fácil y exitosa.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevIndex) => (prevIndex + 1) % newText.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [newText.length]);

  return (
    <>
      <div className="container relative flex justify-center  w-80 lg:w-[35rem]">
        <div className="static flex justify-center w-full ">
          <p
            className={`h-[30rem] w-auto flex justify-center items-center font-bold font-oswald ${"bg-clip-text-image-first"} `}
          >
            W
          </p>
          {newText.map((words, index) => (
            <div
              key={index}
              className={`absolute w-auto top-60 animated-text ${
                text === index ? "show" : "hide"
              }`}
            >
              <p
                className={`text-2xl text-center font-oswald lg:text-3xl font-medium ${"transition-text"}`}
              >
                {words}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
