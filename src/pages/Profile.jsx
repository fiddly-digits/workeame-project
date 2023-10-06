import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import OfferSticker from "../components/OfferSticker";
import CommentCard from "../components/CommentCard";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
/* import DescriptionOfService from "../components/ContactTheWorker/DescriptionOfService"; */
import DateAndTime from "../components/ContactTheWorker/DateAndTime";
import HeaderApp from "../components/HeaderApp";
import Footer from "../components/Footer";

let photos = [
  { key: 1, image: "/pictures/flowers.png", alt: "flowers" },
  { key: 2, image: "/pictures/flowers3.png", alt: "flowers" },
  { key: 3, image: "/pictures/flowers4.png", alt: "flowers" },
];

let services = [
  {
    key: 1,
    name: "Arreglo para ocasión especial",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud .",
    price: "$300 MXN.",
    pricetype: "Precio/arreglo",
    offer: 10,
    offerDescription: "Miembros WORKEA",
  },
  {
    key: 2,
    name: "Arreglos para eventos",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud .",
    price: "$300 MXN.",
    pricetype: "Precio/arreglo",
    offer: 15,
    offerDescription: "Miembros WORKEA",
  },
  {
    key: 3,
    name: "Flores por docena",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud .",
    price: "$300 MXN.",
    pricetype: "Precio/arreglo",
    offer: 10,
    offerDescription: "Miembros WORKEA",
  },
];

export default function Profile() {
  const [showSection, setShowSection] = useState(false);

  const handleCheckboxChange = (e) => {
    setShowSection(e.target.checked);
  };
  return (
    <>
      <HeaderApp></HeaderApp>
      <div className="flex items-center h-auto  bg-fourth mx-auto">
        <div className="absolute inset-0 z-0 left-[100px] top-[25rem] md:-left-[38rem] md:-top-[6rem]  lg:right-[18rem] lg:-top-[9rem] ">
          <h1 className="text-secondary/30 leading-none -rotate-90 font-oswald text-[12rem]  md:text-[14rem] lg:text-[18rem] font-bold ">
            Workea
          </h1>
        </div>
        <main className="z-10 flex flex-col h-full w-80 md:w-auto md:px-10 py-10 m-auto gap-10 ">
          <section className="flex flex-col-reverse md:flex-row md:items-center gap-6 md:gap-12 lg:gap-20 h-auto justify-between w-full  m-auto font-oswald">
            <div className="flex flex-col gap-2 ">
              <h3 className="tracking-[6px] font-medium text-xl text-[#434140]">
                Florista
              </h3>
              <h3 className="tracking-[1px]  text-3xl text-[#7A797B]">
                Hola, mi nombre es
              </h3>
              <h2 className="tracking-[4.8px] font-semibold text-4xl text-[#2C2A29]">
                Karen Segovia
              </h2>
              <p className="font-roboto text-base lg:text-lg text-justify md:max-w-[27rem] lg:max-w-[30rem]  my-5 ">
                Saludos, soy Karen, y estoy aquí para brindarte servicios de
                floristería profesional, ideal para tus eventos o fechas
                especiales.
              </p>
              <div className="flex flex-row gap-2 justify-between  text-sm lg:text-base">
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
                    Happy Client
                  </span>
                </p>
              </div>
            </div>
            <div className="h-52 w-52  md:w-72 md:h-72 lg:w-96 lg:h-96 lg:mr-4 ">
              <img
                src="/pictures/mujer1.jpg"
                alt="women picture"
                className="object-cover w-full h-full rounded-full shadow-md "
              />
            </div>
          </section>
          <section className=" w-full flex flex-col gap-4 items-center mx-auto">
            <div className=" w-full">
              <h3 className="font-oswald font-semibold text-2xl tracking-wider">
                Algunos Proyectos
              </h3>
            </div>
            <div className="w-80 flex justify-center my-5">
              <Swiper
                grabCursor={true}
                spaceBetween={20}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {photos.map((photo) => (
                  <SwiperSlide>
                    <div className="w-80 h-72 ">
                      <img
                        key={photo.key}
                        src={photo.image}
                        alt={photo.alt}
                        className="object-cover h-full w-full shadow-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
          <section className=" bg-white p-2 rounded-md shadow-md w-full flex flex-col items-center gap-4 mx-auto">
            <div className="w-full text-left md:text-center">
              <h3 className="font-oswald font-semibold text-2xl tracking-wider">
                Servicios
              </h3>
            </div>
            <div className="w-full lg:w-[50rem]">
              <Accordion>
                {services.map((service) => (
                  <AccordionItem
                    key={service.key}
                    className="md:w-auto  font-roboto"
                    startContent={
                      <img src="/circle.svg" alt="circle" className="h-8"></img>
                    }
                    title={service.name}
                  >
                    <p className="md:px-5">{service.description}</p>
                    <div className="flex flex-row justify-evenly text-[#7A797B] my-4 ">
                      <p>{service.price}</p>
                      <span className="text-black">|</span>
                      <p>{service.pricetype}</p>
                      <span className="text-black">|</span>
                      <OfferSticker
                        className="bg-yellow-400 m-2"
                        offer={service.offer}
                        description={service.offerDescription}
                      ></OfferSticker>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
          <section className=" w-full flex flex-col gap-4 mx-auto items-center">
            <h3 className="font-oswald font-semibold text-2xl tracking-wider">
              Sus clientes opinan...
            </h3>
            <div className="w-80 md:w-96">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className=" flex justify-center py-5 w-full">
                    <CommentCard></CommentCard>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className=" flex justify-center py-5 w-full">
                    <CommentCard></CommentCard>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <Button
              radius="sm"
              size="lg"
              className="bg-black h-8 text-white font-oswald hover:bg-[#434140]"
            >
              Agregar Comentario{" "}
            </Button>
          </section>
          <section className=" w-full flex flex-row justify-evenly mx-auto my-10 gap-2 md:gap-14">
            <div className="flex flex-col basis-1/2  w-auto font-roboto text-sm justify-between">
              <h3 className="font-oswald font-semibold text-2xl tracking-wider">
                Contacto
              </h3>
              <p className="text-[#7A797B] md:text-base">karen@example.com</p>
              <p className="text-justify text-xs md:text-base ">
                Dirección. Miguel Laurent, Portales Nte, Benito Juárez, 03303
                Ciudad de México, CDMX
              </p>
            </div>
            <div className="flex basis-1/2">
              <div className="h-44 w-full   bg-[#7A797B]">MAPA</div>
            </div>
          </section>
          <section className="w-full flex flex-col justify-between mx-auto gap-2">
            <div>
              <Checkbox
                onChange={handleCheckboxChange}
                radius="full"
                size="lg"
                color="secondary"
              >
                <p className="font-oswald  text-2xl tracking-wider">
                  Contacta con el <span className="font-bold">Worker</span>
                </p>
              </Checkbox>
              <div className="mt-5 mb-10">
                {showSection && (
                  <div>
                    <div className="bg-white h-[28rem] w-full rounded-2xl shadow-[0px_0px_5px_0px_rgba(0,0,0,0.1)]">
                      {/* Name of bd */}
                      {/* <DescriptionOfService name="karen"></DescriptionOfService> */}
                      <DateAndTime></DateAndTime>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer></Footer>
    </>
  );
}
