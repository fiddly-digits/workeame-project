import Header from "../components/Header";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Footer from "../components/Footer";

import BottomButtons from "../components/BottomButtons";
import SwiperCard from "../components/SwiperCard";
import CustomCard from "../components/CustomCard";
import WorkeaTitle from "../components/WorkeaTitle";
import WInfo from "../components/WInfo";
import SwiperCardTwo from "../components/SwiperCardTwo";
import SearchWorker from "../components/SearchWorker";

export default function Landing() {
  return (
    <>
      <Header />
      <main className="flex flex-col mx-auto">
        <section className="flex items-center justify-center bg-primary">
          <article className="container flex flex-col gap-5 items-center justify-center h-screen min-h-screen px-5 bg-primary grow lg:px-24">
            <WorkeaTitle></WorkeaTitle>
            <p className="text-center text-xl font-roboto lg:text-3xl mt-4">
              Somos más que una <span className="font-bold">plataforma</span>;
              somos el enlace entre quienes{" "}
              <span className="font-bold">buscan</span> servicios y aquellos que
              los <span className="font-bold">ofrecen</span>.
            </p>
            <BottomButtons nextTitle="QUIENES SOMOS" reference="second" />
          </article>
        </section>
        <section
          id="second-section"
          className="flex flex-col items-center h-auto p-24 bg-primary"
        >
          <CustomCard />

          <div className="flex flex-col mt-24 mb-7 lg:flex-row lg:items-center lg:max-w-[1200px]">
            <WInfo></WInfo>
          </div>
          <h2 className="text-3xl text-center lg:text-5xl font-oswald text-third font-semibold mb-3">
            ¡Únete y hagamos que las cosas sucedan juntos!
          </h2>
          <BottomButtons nextTitle="COMO FUNCIONA" reference="third" />
        </section>

        <section id="third-section" className="flex justify-center bg-third">
          <article className="container relative flex flex-col items-center h-auto min-h-screen p-10 py-24 justify-evenly bg-third">
            <h1 className="text-5xl subpixel-antialiased font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800">
              COMO FUNCIONA
            </h1>
            <div className="absolute">
              <h1 className="hidden relative bottom-16 text-[400px] translate-x-0 md:hidden text-center font-oswald font-bold leading-none text-secondary lg:block">
                Workea
              </h1>
            </div>
            <div className="relative flex flex-col gap-5 py-10 w-fit grow lg:gap-40">
              <SwiperCardTwo />
              <SwiperCard left />
            </div>
            <BottomButtons nextTitle="PORQUE NOSOTROS" reference="fourth" />
          </article>
        </section>

        <section
          id="fourth-section"
          className="flex justify-center bg-secondary"
        >
          <article className="container relative flex flex-col items-center h-auto min-h-screen p-10 py-24 justify-evenly bg-secondary">
            <div className="flex flex-col  overflow-hidden bg-white rounded-md shadow-lg font-oswald">
              <img
                src="/pictures/person-working-remotely-project 3.webp"
                alt="card-img"
                className="object-cover w-full h-80"
              />
              <div className="p-10">
                <h1 className="pb-8 text-2xl subpixel-antialiased font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800 lg:text-7xl">
                  PORQUE NOSOTROS
                </h1>
                <Accordion variant="light" selectionMode="multiple">
                  <AccordionItem
                    className="md:w-96 lg:w-[50rem]"
                    key="1"
                    aria-label="Accordion 1"
                    title={
                      <p className="text-2xl font-bold font-roboto">
                        Crea tu espacio único
                      </p>
                    }
                    indicator={
                      <img
                        src="/chevron.svg"
                        alt="chevron"
                        className="h-7 w-7"
                      />
                    }
                  >
                    <p className="font-roboto">
                      Refleja quien eres. Personaliza tu perfil y transforma tus
                      metas en realidad con nuestra opciones de diseño
                      incomparable.
                    </p>
                  </AccordionItem>
                  <AccordionItem
                    className="md:w-96 lg:w-[50rem]"
                    key="2"
                    aria-label="Accordion 2"
                    title={
                      <p className="text-2xl font-bold font-roboto">
                        Configura tu horario
                      </p>
                    }
                    indicator={
                      <img
                        src="/chevron.svg"
                        alt="chevron"
                        className="h-7 w-7"
                      />
                    }
                  >
                    <p className="font-roboto">
                      Ajusta tus horarios según tu conveniencia. Elige las
                      fechas y los momentos en los que estás disponible.
                      Personaliza tu agenda en línea para que todo cuadre de la
                      mejor manera.
                    </p>
                  </AccordionItem>
                  <AccordionItem
                    className="md:w-96 lg:w-[50rem]"
                    key="3"
                    aria-label="Accordion 3"
                    title={
                      <p className="text-2xl font-bold font-roboto">
                        Personaliza tus ofertas
                      </p>
                    }
                    indicator={
                      <img
                        src="/chevron.svg"
                        alt="chevron"
                        className="h-7 w-7"
                      />
                    }
                  >
                    <p className="font-roboto">
                      Descubre una nueva forma de obtener lo que realmente
                      necesitas, a tu medida y conveniencia. Personaliza y
                      promueve ofertas únicas para tus clientes.
                    </p>
                  </AccordionItem>
                  <AccordionItem
                    className="md:w-96 lg:w-[50rem]"
                    key="4"
                    aria-label="Accordion 4"
                    title={
                      <p className="text-2xl font-bold font-roboto">
                        Comparte el enlace
                      </p>
                    }
                    indicator={
                      <img
                        src="/chevron.svg"
                        alt="chevron"
                        className="h-7 w-7"
                      />
                    }
                  >
                    <p className="font-roboto">
                      Comparte el enlace de tu sitio y abre la puerta a un mundo
                      de posibilidades: conexiones más fuertes y oportunidades
                      ilimitadas te esperan.
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <BottomButtons nextTitle="BUSCA TU WORKER" reference="fifth" />
          </article>
        </section>
        <section id="fifth-section">
          <SearchWorker></SearchWorker>
        </section>
        <Footer />
      </main>
    </>
  );
}
