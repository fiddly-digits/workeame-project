import { useEffect, useState } from "react";
import DualButton from "./DualButton";
import { stack as Menu } from "react-burger-menu";
import clsx from "clsx";

export default function Header() {
  const [header, setHeader] = useState("primary");

  const changeBackground = () => {
    if (window.scrollY >= 5130) {
      setHeader("white");
    } else if (window.scrollY >= 4152) {
      setHeader("purple");
    } else if (window.scrollY >= 2444) {
      setHeader("orange");
    } else {
      setHeader("primary");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header
      className={clsx(
        `flex grow items-center h-20 justify-between px-5  top-0 z-50 lg:justify-evenly lg:px-24`,
        {
          "bg-primary": header === "primary",
        },
        {
          "bg-third": header === "orange",
        },
        {
          "bg-secondary": header === "purple",
        },
        { "bg-fourth": header === "white" }
      )}
    >
      <h1 className="text-4xl font-bold w-fit h-fit font-oswald">
        W<span className="lg:hidden">orkea</span>
      </h1>

      <nav className="items-center hidden gap-5 lg:flex">
        <a href="#second-section" className="line font-oswald">
          QUIENES SOMOS
        </a>
        <a href="#third-section" className="line font-oswald">
          COMO FUNCIONA
        </a>
        <a href="#fourth-section" className="line font-oswald">
          PORQUE NOSOTROS
        </a>
      </nav>
      <DualButton className="hidden lg:flex z-10" />
      <nav className="relative flex w-8 h-8 lg:hidden">
        <Menu right>
          <a
            href="#second-section"
            className="font-oswald my-3 hover:scale-y-125"
          >
            QUIENES SOMOS
          </a>
          <a
            href="#third-section"
            className="font-oswald my-3 hover:scale-y-125"
          >
            COMO FUNCIONA
          </a>
          <a
            href="#fourth-section"
            className="font-oswald my-3 hover:scale-y-125"
          >
            PORQUE NOSOTROS
          </a>
          <a
            href="#fifth-section"
            className="font-oswald my-3 hover:scale-y-125"
          >
            QUIERO UN WORKER
          </a>
          <a href="" className="font-oswald my-3 hover:scale-y-125 ">
            SER UN WORKER
          </a>
        </Menu>
      </nav>
    </header>
  );
}
