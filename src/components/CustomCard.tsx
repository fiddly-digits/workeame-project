import { image } from "@nextui-org/react";

export default function CustomCard() {
  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-md font-oswald">
      <div className="p-10">
        <h1 className="pb-8 text-2xl subpixel-antialiased font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800 lg:text-5xl">
          QUIENES SOMOS
        </h1>
        <p className="subpixel-antialiased text-center text-md font-roboto text-neutral-600 lg:text-2xl">
          ¡Te presentamos <span className="font-bold">WORKEA</span>! Con nuestro
          registro <span className="font-bold">gratuito</span>, adapta tu
          espacio como quieras y organiza tus servicios. Además,
          <span className="font-bold"> facilitamos</span> que tus clientes te
          encuentren y reserven citas al{" "}
          <span className="font-bold">instante</span>.
        </p>
      </div>
      <div className="h-[25rem] overflow-hidden">
        <img
          className="object-cover w-full h-full bg-center "
          src="https://workeame-bucket.s3.amazonaws.com/hero-1.webp"
          alt="card-img"
        />
      </div>
    </div>
  );
}
