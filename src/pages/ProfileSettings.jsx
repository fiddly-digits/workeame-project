import HeaderApp from "../components/HeaderApp";
import Footer from "../components/Footer";
import ServicesDetail from "../components/ServicesDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

let images = [
  { key: 1, img: "/pictures/flowers.png", alt: "image 01" },
  { key: 2, img: "/pictures/flowers3.png", alt: "image 02" },
  { key: 3, img: "/pictures/flowers4.png", alt: "image 03" },
];
let categories = [
  { label: "Salud", value: "health" },
  { label: "Belleza", value: "beauty" },
  { label: "Arte", value: "arts" },
  { label: "Ingenieria", value: "engineering" },
  { label: "Educación", value: "education" },
  { label: "Social", value: "social" },
];

let experience = [
  { label: "1-2", value: "1-2" },
  { label: "2-3", value: "2-3" },
  { label: "3-4", value: "3-4" },
  { label: "4-5", value: "4-5" },
  { label: "Más de 5", value: "mas de 5" },
];

export default function ProfileSettings() {
  const [service, setService] = useState([0]); // Estado para almacenar los componentes

  // Función para agregar un nuevo componente
  const addService = () => {
    setService([...service, <ServicesDetail key={service.length} />]);
  };

  // Función para quitar el último componente
  const deleteService = () => {
    const newsServices = [...service];
    newsServices.pop();
    setService(newsServices);
  };
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
              <div className="mt-10">
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
            <section className="flex flex-col gap-3 mx-10 md:mx-40 my-8 items-center">
              <p className="flex justify-center font-oswald text-lg">
                Cuéntale a tus clientes de qué va tu trabajo{" "}
              </p>
              <p className="flex justify-center font-oswald font-bold text-2xl">
                ¡Queremos acercarlos a tí!
              </p>
              {/* textarea "about me" */}
              <div className="flex justify-center my-4 w-full md:max-w-xl">
                <Textarea
                  variant="bordered"
                  placeholder="Cuéntanos sobre ti..."
                  description="Esta información aparecerá en tu descripción, asegúrate de que sea breve."
                  className="font-roboto w-full max-w-xl"
                ></Textarea>
              </div>
              {/* select class and years */}
              <div className=" flex w-full md:max-w-xl flex-wrap md:flex-nowrap gap-6 font-roboto justify-center">
                <Select
                  label="Categoria"
                  className="w-full md:w-1/2 font-roboto"
                >
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Años de experiencia"
                  className="w-full md:w-1/2 font-roboto"
                >
                  {experience.map((years) => (
                    <SelectItem key={years.value} value={years.value}>
                      {years.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </section>
            {/* services details */}
            <section className="flex flex-col gap-3 mx-10  my-8 items-center">
              <div className="flex flex-col items-center w-full ">
                {service.map((index) => (
                  <div key={index} className="flex justify-center w-full">
                    <ServicesDetail></ServicesDetail>
                  </div>
                ))}
              </div>
              <div className="flex flex-row gap-16 my-10 ">
                <Button
                  radius="sm"
                  className="bg-transparent border border-black text-black font-oswald hover:bg-wkablack hover:text-white w-auto px-8"
                  onClick={addService}
                >
                  Agregar Servicio
                </Button>
                <Button
                  radius="sm"
                  className="bg-transparent border border-black text-black font-oswald hover:bg-wkablack hover:text-white w-auto px-8"
                  onClick={deleteService}
                >
                  Eliminar Servicio
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
