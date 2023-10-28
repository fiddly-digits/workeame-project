import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderOnThird from "./SliderOnThird";
import clsx from "clsx";

interface Props {
  left?: boolean;
}

export default function SwiperCard({ left }: Props) {
  return (
    <div className="flex flex-col items-center overflow-hidden bg-white rounded-md shadow-md lg:max-h-80 font-oswald lg:flex-row">
      <div
        className={clsx(
          "flex flex-col font-oswald justify-center text-center ",
          {
            "order-last": left,
          }
        )}
      >
        <div className="flex flex-col justify-center w-80 p-3 lg:w-[30rem] lg:p-5 lg:ml-32">
          <h3 className="text-2xl font-bold tracking-wider font-oswald lg:text-2xl">
            ¿Quieres <span className="text-third">buscar</span> un{" "}
            <span className="font-bold">WORKER</span>?
          </h3>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <SliderOnThird
                step={1}
                text=" donde quieras y comienza a Workear"
                callout={["Comparte este enlace"]}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={2}
                text=" adecuado para tí"
                callout={["Identifica al Worker"]}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={3}
                text="¡Prepárate para conectar y colaborar!"
                callout={["Registrate para contactar a tu Worker "]}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={4}
                text=", si tienes preguntas. Luego, elige tu cita y paga un adelanto con el método de pago que te convenga. Simplificamos todo para ti."
                callout={["Chatea con tu Worker"]}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={5}
                text="y prepárate para recibir un excelente servicio. Asegurar tu cita es clave para disfrutar de una experiencia genial. Estamos aquí para ofrecerte lo mejor."
                callout={["Confirma tu cita "]}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="w-auto h-full lg:min-h-80">
        <img
          className="object-cover h-full lg:object-fill"
          src="/pictures/team-working-together-project 6.webp"
          alt="card-img"
        />
      </div>
    </div>
  );
}
