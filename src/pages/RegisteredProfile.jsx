import HeaderApp from "../components/HeaderApp";
import Footer from "../components/Footer";
import WorkerCardFlip from "../components/WorkerCardFlip";
import { Button } from "@nextui-org/react";

let workerCard = [
  {
    key: 3,
    name: "Karen Segovia",
    picture: "/pictures/mujer1.jpg",
    job: "Florista",
    adress: "Col. Roma , CDMX",
    description:
      "Hola, soy Karen y estoy aquí para brindarte servicios de floristeria profesional.",
    position: "t",
  },
];

export default function RegisteredProfile() {
  return (
    <>
      <div className="bg-fourth">
        <HeaderApp></HeaderApp>
        <main className="flex flex-col h-full w-auto md:px-10 py-10 m-auto">
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
            {workerCard.map((card) => (
              <WorkerCardFlip
                key={card.key}
                name={card.name}
                job={card.job}
                picture={card.picture}
                adress={card.adress}
                description={card.description}
                position={card.position}
              ></WorkerCardFlip>
            ))}
          </div>
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
