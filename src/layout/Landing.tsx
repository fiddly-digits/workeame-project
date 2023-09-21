import Header from "../components/Header";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Footer from "../components/Footer";
import FifthSection from "../components/FifthSection";
import BottomButtons from "../components/BottomButtons";
import SwiperCard from "../components/SwiperCard";
import CustomCard from "../components/CustomCard";
import WorkeaTitle from "../components/WorkeaTitle";
import HeroSection from "../components/HeroSection";

export default function Landing() {
  return (
    <>
      <Header />
      <main className="flex flex-col mx-auto">
        <section className="flex items-center justify-center bg-primary">
          <article className="container flex flex-col gap-5 items-center justify-center h-screen min-h-screen px-5 bg-primary grow lg:px-24">
            <WorkeaTitle></WorkeaTitle>
            <p className="text-center text-xl font-roboto lg:text-3xl">
              Somos más que una <span className="font-bold">plataforma</span>;
              somos el enlace entre quienes{" "}
              <span className="font-bold">buscan</span> servicios y aquellos que
              los <span className="font-bold">ofrecen</span>.
            </p>
            <BottomButtons nextTitle="QUIENES SOMOS" reference="second" />
          </article>
        </section>
        <section className="flex flex-col items-center h-auto p-24 bg-primary">
          <CustomCard />
          <div></div>
          <div className="flex flex-col my-24 lg:flex-row lg:items-center lg:max-w-[1200px]">
            <p className="text-xl text-center font-oswald lg:text-2xl">
              Lo que nos hace diferentes es que tenemos todas estas herramientas
              en un solo sitio.
            </p>
            <h2 className="font-bold leading-none text-center text-[250px] text-transparent bg-fixed bg-right-bottom bg-no-repeat lg:text-[500px] font-oswald bg-clip-text bg-hero-pattern">
              W
            </h2>
            <p className="text-xl text-center font-oswald lg:text-2xl">
              Nuestra meta es unir a clientes y proveedores de forma fácil y
              exitosa.
            </p>
          </div>
          <h2 className="text-2xl text-center lg:text-5xl font-oswald text-third">
            ¡Únete y hagamos que las cosas sucedan juntos!
          </h2>
          <BottomButtons nextTitle="COMO FUNCIONA" reference="second" />
        </section>

        <section className="flex justify-center bg-third">
          <article className="container relative flex flex-col items-center h-auto min-h-screen p-10 py-24 justify-evenly bg-third">
            <h1 className="text-5xl subpixel-antialiased font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800">
              COMO FUNCIONA
            </h1>
            <div className="absolute">
              <h1 className="hidden relative text-[380px] translate-x-0 md:hidden text-center font-oswald font-bold leading-none text-secondary lg:block">
                Workea
              </h1>
            </div>
            <div className="relative flex flex-col gap-5 py-10 w-fit grow lg:gap-72">
              <SwiperCard />
              <SwiperCard left />
            </div>
            <BottomButtons nextTitle="PORQUE NOSOTROS" reference="second" />
          </article>
        </section>

        <section className="flex justify-center bg-secondary">
          <article className="container relative flex flex-col items-center h-auto min-h-screen p-10 py-24 justify-evenly bg-secondary">
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-md font-oswald">
              <img
                src="https://workeame-bucket.s3.amazonaws.com/hero-1.webp"
                alt="card-img"
                className="object-cover w-full h-96"
              />
              <div className="p-10">
                <h1 className="pb-8 text-2xl subpixel-antialiased font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800 lg:text-7xl">
                  PORQUE NOSOTROS
                </h1>
                <Accordion variant="light" selectionMode="multiple">
                  <AccordionItem
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
            <BottomButtons nextTitle="BUSCA TU WORKER" reference="second" />
          </article>
        </section>
        <FifthSection />
        <Footer />
      </main>
    </>
  );
}
