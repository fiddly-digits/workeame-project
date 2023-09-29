import HeaderApp from "../components/HeaderApp";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Button } from "@nextui-org/react";

let images = [
  { key: 1, img: "/pictures/flowers.png", alt: "image 01" },
  { key: 2, img: "/pictures/flowers3.png", alt: "image 02" },
  { key: 3, img: "/pictures/flowers4.png", alt: "image 03" },
];

export default function ProfileSettings() {
  return (
    <>
      <div className="bg-fourth">
        <HeaderApp></HeaderApp>
        <main className="flex flex-col h-full w-auto md:px-10 py-10 m-auto gap-10 ">
          <form action="">
            <section className="flex flex-col  mx-10 md:mx-40">
              <h2 className="flex justify-center text-center font-oswald  text-3xl">
                ¡Muestra tu trabajo al mundo!
              </h2>
              <div className="my-2">
                <p className="flex justify-center text-center font-roboto text-gray-500 text-lg">
                  Agrega unas fotos de tu trabajo, ¡Elige tu diseño!
                </p>
                {/* upload photos */}
                <div className=" w-full flex justify-center font-roboto my-5 md:px-8 lg:px-20">
                  <Swiper
                    pagination={{
                      type: "fraction",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {images.map((image) => (
                      <SwiperSlide>
                        <div className="w-full flex justify-center">
                          <div className="p-10 w-80 h-80 md:w-96 md:h-96">
                            <img
                              key={image.key}
                              src={image.img}
                              alt={image.alt}
                              className="object-cover h-full w-full "
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="flex justify-center ">
                <Button
                  radius="sm"
                  className="bg-black text-white font-oswald hover:bg-zinc-700 w-auto px-8"
                >
                  <img src="/upload.svg" alt="upload" className="w-6 h-6" />
                  Añadir Imagen
                </Button>
              </div>
            </section>
          </form>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
