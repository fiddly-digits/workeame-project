import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SliderOnThird from './SliderOnThird';
import clsx from 'clsx';

interface Props {
  left?: boolean;
}

export default function SwiperCardTwo({ left }: Props) {
  return (
    <div className='flex flex-col items-center overflow-hidden bg-white rounded-md shadow-md lg:max-h-80 font-oswald lg:flex-row'>
      <div
        className={clsx(
          'flex flex-col font-oswald justify-center text-center ',
          {
            'order-last': left
          }
        )}
      >
        <div className='flex flex-col items-center justify-center w-80 p-3 lg:w-[30rem] lg:p-5'>
          <h3 className='text-2xl font-bold tracking-wider font-oswald lg:text-2xl'>
            ¿Quieres <span className='text-third'>ser</span> un{' '}
            <span className='font-bold'>WORKER</span>?
          </h3>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            <SwiperSlide>
              <SliderOnThird
                step={1}
                text='Crea tu perfil ingresando algunos detalles básicos.'
                callout={['Registrate.']}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={2}
                text='Personalízalo para mostrar tus servicios como prefieras'
                callout={['Crea tu Sitio.']}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={3}
                text='y sube algunas fotos de tus trabajos más recientes. Es la manera perfecta de mostrar lo que haces y responder a posibles dudas de tus clientes'
                callout={['Cuéntanos sobre tus servicios.']}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={4}
                text='Aquí puedes establecer tus horarios disponibles para tus servicios. Es una manera eficiente de organizar tu tiempo y estar listo para tus clientes'
                callout={['Define tu calendario.']}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderOnThird
                step={5}
                text=' donde quieras y comienza a Workear'
                callout={['Comparte este enlace']}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className='w-full h-full lg:min-h-80'>
        <img
          className='object-cover w-screen h-full '
          src='/pictures/team_work_last.webp'
          alt='card-img'
        />
      </div>
    </div>
  );
}
