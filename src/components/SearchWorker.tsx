import Input from "./Input";
import WorkerButton from "./WorkerButton";
import WorkerCardFlip from "./WorkerCardFlip";
import { ScrollShadow } from "@nextui-org/react";

const workers = [
  {
    key: 1,
    name: "Erick F.",
    picture: "/pictures/erick.png",
    job: "Diseñador de Modas",
    adress: "Narvarte, CDMX",
    description:
      "Hola, soy Erick y estoy aquí para brindarte servicios de diseño profesional.",
    position: "t",
  },
  {
    key: 2,
    name: "Ana R.",
    picture: "/pictures/ana.png",
    job: "Psicóloga",
    adress: "Mty, N.L.",
    description:
      "Hola, soy Ana y estoy aquí para brindarte servicios de psicología profesional.",
    position: "t",
  },
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
  {
    key: 4,
    name: "Carmen M.",
    picture: "/pictures/carmen.png",
    job: "Masajista",
    adress: "Gdl. , Jal.",
    description:
      "Hola, soy Carmen y estoy aquí para brindarte servicios de terapia corporal, masajes reductivos,etc.",
    position: "t",
  },
  {
    key: 5,
    name: "Sebastian M.",
    picture: "/pictures/sebastian.png",
    job: "Programador",
    adress: "Col.Juárez, CDMX",
    description:
      "Hola, soy Sebastián y estoy aquí para brindarte servicios de programación full-stack.",
    position: "t",
  },
  {
    key: 6,
    name: "Elmer Figueroa",
    picture: "/pictures/chayanne.webp",
    job: "Artista",
    adress: "Polanco, CDMX",
    description:
      "Hola, soy Elmer y estoy aquí para brindarte servicios artisticos y de entretenimiento profesionales",
    position: "t",
  },
];

//Aleatorizar Workers Cards
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //genera un número entero aleatorio j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; //intercambia la posición de i y j
  }
  return newArray;
}
// Aleatoriza el orden de las cards
const shuffledWorkersCards = shuffleArray(workers);

export default function SearchWorker() {
  return (
    <>
      <div className=" bg-fourth">
        <div className="container w-auto m-auto flex flex-col gap-2 justify-center ">
          <h1 className=" text-5xl mt-20 font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800 my-3">
            BUSCA TU{" "}
            <span className={`text-5xl font-bold ${"bg-clip-text-image"}`}>
              WORKER
            </span>
          </h1>

          <form action="" className="flex flex-row justify-center gap-5 w-auto">
            <Input
              type={"text"}
              placeholder="Que tipo de worker buscas"
              icon="search-icon"
            />
            <Input type={"text"} placeholder="Localidad" icon="map-icon" />
          </form>
          <ScrollShadow
            hideScrollBar
            size={5}
            offset={100}
            orientation="vertical"
            className="w-auto max-h-[35rem] my-10"
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 justify-items-center ">
              {shuffledWorkersCards.map((card) => (
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
          </ScrollShadow>
          <div className="flex w-auto justify-center mt-5 mb-20">
            <WorkerButton
              action="CONVIERTETE EN WORKER"
              className="border-hidden text-lg h-16 bg-white hover:bg-gray-950 shadow-md transition-colors duration-700 ease-in"
            />
          </div>
        </div>
      </div>
    </>
  );
}
