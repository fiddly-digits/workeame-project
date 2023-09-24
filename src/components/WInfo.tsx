import React, { useState, useEffect } from "react";

const text1 =
  "Lo que nos hace diferentes es que tenemos todas estas herramientas en un solo sitio.";
const text2 =
  "Nuestra meta es unir a clientes y proveedores de forma fácil y exitosa.";
export default function WInfo() {
  const [text, setText] = useState("");
  const newTexts = [text1, text2];
  const intervalDuration = 5000;
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setText(newTexts[currentIndex]);
      currentIndex = (currentIndex + 1) % newTexts.length;
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="container relative flex justify-center  w-80 lg:w-[35rem]">
        <div className="flex justify-center w-full static ">
          <p
            className={`h-[30rem] w-auto flex justify-center items-center font-bold font-oswald ${"bg-clip-text-image-first"} `}
          >
            W
          </p>
          <div className="w-auto absolute top-64 ">
            <p
              className={`text-2xl text-center font-oswald lg:text-3xl font-medium ${"transition-text"}`}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="flex flex-col ">
            <p className="text-xl text-center font-oswald lg:text-2xl">
              Lo que nos hace diferentes es que tenemos todas estas herramientas
              en un solo sitio.
            </p>
          </div>
          <div>
            <p className="text-xl text-center font-oswald lg:text-2xl">
              Nuestra meta es unir a clientes y proveedores de forma fácil y
              exitosa.
            </p>
          </div> */
}

/* 
import TextChanger from "./textChanger";

export default function FirstInfoClient() {
  return (
    <>
      <div className="container relative flex justify-center ">
        <div className="static">
          <p
            className={`h-[45rem] w-[28rem] flex justify-center font-bold font-oswald ${"bg-clip-text-image-first"}`}
          >
            W
          </p>
          <div className="flex flex-col absolute top-[14rem] lg:right-[14rem]">
            <h1 className="text-[9rem] font-oswald font-bold tracking-[3px] ">
              Workea
            </h1>
            <TextChanger></TextChanger>
          </div>
        </div>
      </div>
    </>
  );
} */
