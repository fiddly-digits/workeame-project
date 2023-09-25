import { Divider } from "@nextui-org/react";

export default function Profile() {
  return (
    <>
      <div className="flex items-center h-screen md:max-h-[50rem] bg-fourth">
        <div className="absolute inset-0 z-0 left-[16rem] top-[32rem] md:-left-[38rem] md:-top-[6rem]  lg:right-[18rem] lg:-top-[14rem] ">
          <h1 className=" text-secondary/40 -rotate-90 font-oswald  text-[15rem] lg:text-[18rem] font-bold ">
            Workea
          </h1>
        </div>
        <main className="z-10 flex flex-col h-full py-10 px-5 mx-auto ">
          <section className="flex flex-col-reverse md:flex-row md:items-center gap-6 md:gap-12 lg:gap-20 h-auto border border-green-400 mx-auto font-oswald">
            <div className="flex flex-col gap-2">
              <h3 className="tracking-[6px] font-medium text-xl text-[#434140]">
                Florista
              </h3>
              <h3 className="tracking-[1px]  text-3xl text-[#7A797B]">
                Hola, mi nombre es
              </h3>
              <h2 className="tracking-[4.8px] font-semibold text-4xl text-[#2C2A29]">
                Karen Segovia
              </h2>
              <p className="font-roboto text-base text-justify max-w-md my-3 ">
                Saludos, soy Karen, y estoy aquí para brindarte servicios de
                floristería profesional, ideal para tus eventos o fechas
                especiales.
              </p>
              <div className="flex flex-row gap-2 justify-between  text-md">
                <p className="font-medium">
                  5 Años{" "}
                  <span className="font-normal text-[#7A797B]">
                    Experiencia
                  </span>
                </p>
                <span>|</span>
                <p className="font-medium">
                  200+{" "}
                  <span className="font-normal text-[#7A797B]">
                    Proyectos completados
                  </span>
                </p>
                <span>|</span>
                <p className="font-medium">
                  50+
                  <span className="font-normal text-[#7A797B]">
                    Happy Clients
                  </span>
                </p>
              </div>
            </div>
            <div className="h-64 w-64 bg-red-700 shadow-md">
              <img
                src="/pictures/mujer1.jpg"
                alt="women picture"
                className="object-cover w-full h-full"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
