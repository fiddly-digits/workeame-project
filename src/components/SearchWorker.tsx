import Input from "./Input";
import WorkerButton from "./WorkerButton";
import WorkerCardFlip from "./WorkerCardFlip";

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
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 justify-items-center ">
            {workers.map((worker) => (
              <WorkerCardFlip
                key={worker.key}
                name={worker.name}
                job={worker.job}
                picture={worker.picture}
                adress={worker.adress}
                description={worker.description}
                position={worker.position}
              ></WorkerCardFlip>
            ))}
          </div>
          <div className="flex w-auto justify-center m-10">
            <WorkerButton
              action="CONVIERTETE EN WORKER"
              className=" bg-white hover:bg-gray-950 shadow-md transition-colors duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </>
  );
}
