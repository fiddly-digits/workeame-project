import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import WorkerCard from "../components/WorkerCard";
import { Button } from "@nextui-org/react";

const bgRandom = ["bg-primary", "bg-secondary", "bg-third", "bg-white"];
const randomIndex = Math.floor(Math.random() * bgRandom.length);
const randomStyle = bgRandom[randomIndex];

export default function RegisteredClient() {
  return (
    <>
      <div className="bg-fourth">
        <HeaderApp></HeaderApp>
        <main className="flex flex-col h-full w-auto md:px-10 py-10 m-auto gap-10">
          <div className="flex flex-row gap-2 justify-center ">
            <img
              src="/check-circle.svg"
              alt="check-circle"
              className="w-16"
            ></img>
            <h2 className="flex justify-center font-oswald m-5 text-2xl">
              ¡Tu perfil está registrado!
            </h2>
          </div>
          <div className="flex justify-center">
            <WorkerCard
              name="Alex R."
              picture="/pictures/man.png"
              className={randomStyle}
            ></WorkerCard>
          </div>
          <p className="font-roboto text-gray-600 text-xl tracking-wider text-center">
            Ir a tu{" "}
            <span className="text-black hover:font-bold  hover:animate-appearance-in transition-all duration-100">
              <Link to={"/Dashboard"}>Dashboard</Link>
            </span>
          </p>
          <div className="flex justify-center">
            <Button
              radius="sm"
              className="bg-black text-white font-oswald hover:bg-zinc-700 w-60 px-8"
            >
              <img src="/arrow-right.svg" alt="arrow" className="w-6 h-6" />
              Siguiente
            </Button>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
