import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

export default function Profile() {
  return (
    <>
      <div className="flex items-center h-auto md:max-h-[50rem] bg-fourth mx-auto">
        <div className="absolute inset-0 z-0 left-[12rem] top-[25rem] md:-left-[38rem] md:-top-[6rem]  lg:right-[18rem] lg:-top-[14rem] ">
          <h1 className=" text-secondary/30 leading-none -rotate-90 font-oswald text-[12rem]  md:text-[14rem] lg:text-[18rem] font-bold ">
            Workea
          </h1>
        </div>
        <main className="z-10 flex flex-col h-full py-10 px-5 mx-auto gap-5 ">
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
              <p className="font-roboto text-base text-justify max-w-md my-5 ">
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
                    Happy Client
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
          <section className="border border-blue-600 w-full flex flex-col gap-4 items-center mx-auto">
            <div className="border border-orange-600 w-full">
              <h3 className="font-oswald font-semibold text-2xl tracking-wider">
                Algunos Proyectos
              </h3>
            </div>
            <div className="w-80 shadow-md">
              <Swiper
                effect={"coverflowEffect"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="flex h-72 w-96">
                    <img
                      src="https://swiperjs.com/demos/images/nature-1.jpg"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex  h-72 w-80">
                    <img
                      src="https://swiperjs.com/demos/images/nature-1.jpg"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex  h-72 w-80">
                    <img
                      src="https://swiperjs.com/demos/images/nature-1.jpg"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
