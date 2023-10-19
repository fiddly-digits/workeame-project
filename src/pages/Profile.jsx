import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectFade, Pagination, Navigation } from 'swiper/modules';
import { Accordion, Spinner, AccordionItem, Snippet } from '@nextui-org/react';
//import OfferSticker from '../components/OfferSticker';
import CommentCard from '../components/CommentCard';
import { Checkbox } from '@nextui-org/react';
import { useState, useEffect } from 'react';
/* import DescriptionOfService from "../components/ContactTheWorker/DescriptionOfService"; */
import DateAndTime from '../components/ContactTheWorker/DateAndTime';
import HeaderApp from '../components/HeaderApp';
import Footer from '../components/Footer';
import { fetchMS } from '../utils/fetch';
import { useParams } from 'react-router-dom';
import { handleExpertise } from '../utils/utils';
import clsx from 'clsx';

export default function Profile() {
  const [showSection, setShowSection] = useState(false);
  const [userData, setUserData] = useState({});
  const [siteData, setSiteData] = useState({});
  const [services, setServices] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [shareURL, setShareURL] = useState('');
  const [token, setToken] = useState(null);
  const [images, setImages] = useState([]);

  const params = useParams();
  const tokenExists = sessionStorage.getItem('token');

  useEffect(() => {
    if (tokenExists) {
      const payload = tokenExists.split('.')[1];
      const plainPayload = payload ? JSON.parse(atob(payload)) : {};
      setToken(plainPayload);
    }
    fetchMS({ accept: 'application/json' }, params)
      .then((res) => {
        setSiteData(res);
        setImages(Object.values(res.carousel));
        setUserData(res.owner);
        setSchedule(res.owner.Schedule);
        setServices(res.owner.Services);
        setShareURL(`https://workea.me/ms/${res.micrositeURL}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params, tokenExists]);

  console.log('theme', siteData.theme);
  console.log(token);

  const backgroundClasses = clsx('flex flex-col items-center h-auto mx-auto', {
    'bg-third/90': siteData.theme === 1,
    'bg-secondary/90': siteData.theme === 2,
    'bg-fourth': siteData.theme === 3
  });

  const workeaClasses = clsx(
    'leading-none -rotate-90 font-oswald text-[12rem]  md:text-[14rem] lg:text-[18rem] font-bold',
    {
      'text-secondary/60': siteData.theme === 1,
      'text-third/70': siteData.theme === 2,
      'text-secondary/50': siteData.theme === 3
    }
  );

  const serviceMenuClasses = clsx(
    'flex flex-col items-center w-full gap-4 p-2 mx-auto rounded-md shadow-xl',
    {
      'bg-[#FC5826]': siteData.theme === 1,
      'bg-[#7F66E5]': siteData.theme === 2,
      'bg-white': siteData.theme === 3
    }
  );

  const headerColor = {
    1: 'primary/50',
    2: 'secondary/50',
    3: 'fourth/50'
  };

  const workeaFooterClasses = clsx('...', {
    'text-secondary': siteData.theme === 1,
    'text-third': siteData.theme === 2,
    'text-secondary/90': siteData.theme === 3
  });

  const textsFooterClasses = clsx('...', {
    'text-wkablack': siteData.theme === 1,
    'text-[#020202]': siteData.theme === 2,
    'text-primary/30': siteData.theme === 3
  });

  const handleCheckboxChange = (e) => {
    setShowSection(e.target.checked);
  };

  if (!siteData || !userData || !services.length || !schedule.length) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Spinner color='secondary' label='Cargando...' size='lg' />
      </div>
    );
  }

  return (
    <>
      <div className={backgroundClasses}>
        <HeaderApp color={headerColor[siteData.theme]} />
        <div className='absolute z-0 left-2 top-[18rem] md:-left-[15rem] md:top-[20rem]  lg:right-[45rem] lg:top-[19rem] '>
          <h1 className={workeaClasses}>Workea</h1>
        </div>
        <main className='z-10 flex flex-col h-full gap-10 py-10 m-auto w-80 md:w-auto md:px-10 '>
          <section className='flex flex-col-reverse justify-between w-full h-auto gap-6 m-auto md:flex-row md:items-center md:gap-12 lg:gap-20 font-oswald'>
            <div className='flex flex-col gap-5 '>
              <h3 className='tracking-[1px]  text-3xl font-normal'>
                Hola, mi nombre es
              </h3>
              <h2 className='tracking-[4.8px] font-bold text-4xl text-black'>
                {`${userData.name} ${userData.lastName}`}
              </h2>
              <p className='font-roboto text-base text-zinc-800 font-light max-w-80 overflow-clip text-ellipsis lg:text-lg text-justify md:max-w-[27rem] lg:max-w-[30rem]  my-5 '>
                {siteData.about}
              </p>
              <div className='flex flex-row justify-between gap-2 text-sm lg:text-base'>
                <p className='font-medium'>
                  {handleExpertise(userData.expertise)}
                </p>
              </div>
            </div>
            <div className='h-52 w-52 md:w-72 md:h-72 lg:w-80 lg:h-80 lg:mr-4 '>
              <img
                src={userData.photo}
                alt='women picture'
                className='object-cover w-full h-full rounded-full shadow-md '
              />
            </div>
          </section>
          <section className='flex flex-col items-center w-full gap-4 mx-auto '>
            <div className='w-full '>
              <h3 className='text-2xl font-semibold tracking-wider font-oswald'>
                Algunos Proyectos
              </h3>
            </div>
            <div className='flex justify-center my-5 w-80'>
              <Swiper
                grabCursor={true}
                spaceBetween={20}
                effect={'fade'}
                pagination={{
                  clickable: true
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className='mySwiper'
              >
                {images.map((image) => (
                  <SwiperSlide key={image.split('/').pop()}>
                    <div className='pb-5 w-80 h-72 lg:w-96 lg:h-80'>
                      <img
                        src={image}
                        alt={image.split('/').pop()}
                        className='object-cover w-full h-full shadow-lg'
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
          <section className={serviceMenuClasses}>
            <div className='w-full text-left md:text-center'>
              <h3 className='text-2xl font-semibold tracking-wider font-oswald'>
                Servicios
              </h3>
            </div>
            <div className='w-full lg:w-[50rem]'>
              <Accordion>
                {services.map((service) => (
                  <AccordionItem
                    key={service._id}
                    className='md:w-auto font-roboto'
                    startContent={
                      <img src='/circle.svg' alt='circle' className='h-6'></img>
                    }
                    title={service.name}
                  >
                    <p className='md:px-5'>{service.description}</p>
                    <div className='flex flex-row justify-center gap-2 my-4 text-zinc-700 '>
                      <p className='after:content-["MXN"] before:content-["$"]'>
                        {` ${service.price} `}
                      </p>
                      <p>{service.isPaymentPerHour && 'por hora'}</p>
                      {/* <span className='text-black'>|</span>
                      <p>{service.pricetype}</p>
                      <span className='text-black'>|</span>
                      <OfferSticker
                      className='m-2 bg-yellow-400'
                      offer={service.offer}
                      description={service.offerDescription}
                    ></OfferSticker> */}
                    </div>
                    <div className='flex justify-center'>
                      {service.Discounts.length != 0 && (
                        <p>Aqui van los descuentos</p>
                      )}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
          <section className='flex flex-col items-center w-full gap-4 mx-auto '>
            <h3 className='text-2xl font-semibold tracking-wider font-oswald'>
              Sus clientes opinan...
            </h3>
            <div className='w-full md:w-96'>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className='mySwiper'
              >
                <SwiperSlide>
                  <div className='flex justify-center w-full py-5'>
                    <CommentCard></CommentCard>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='flex justify-center w-full py-5 '>
                    <CommentCard></CommentCard>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>

          {!token || token.id === userData._id ? (
            <section className='flex flex-row w-full gap-2 mx-auto my-10 justify-evenly md:gap-14'>
              <div className='flex flex-col items-center w-auto gap-3 text-sm basis-1/2 font-roboto'>
                <h3 className='text-2xl font-semibold tracking-wider text-center font-oswald w-80 md:w-96'>
                  {token && token.id === userData._id
                    ? 'Te gusta como se ve, compártelo'
                    : `Interesado en los servicios de ${userData.name}`}
                </h3>
                {!token ||
                  (token.id === userData._id && (
                    <Snippet
                      color='wkablack'
                      symbol=''
                      variant='bordered'
                      className='border border-black w-80 md:w-full overflow-clip text-ellipsis'
                    >
                      {shareURL}
                    </Snippet>
                  ))}
                <p className='text-zinc-700 md:text-base'>
                  {token && token.id === userData._id
                    ? 'Siempre puedes modificarlo en tu Dashboard'
                    : 'Registrate o inicia sesión para contactarle'}
                </p>
              </div>
            </section>
          ) : (
            <>
              <section className='flex flex-row w-full gap-2 mx-auto my-10 justify-evenly md:gap-14'>
                <div className='flex flex-col justify-center w-auto text-sm font-roboto'>
                  <h3 className='text-3xl font-semibold tracking-wider font-oswald'>
                    Zona de Trabajo
                  </h3>
                  <p className='text-center text-md md:text-xl '>
                    {userData.address.state}
                  </p>
                </div>
              </section>
              <section className='flex flex-col justify-between w-full gap-2 mx-auto'>
                <div>
                  <Checkbox
                    onChange={handleCheckboxChange}
                    radius='full'
                    size='lg'
                    color='secondary'
                  >
                    <p className='text-2xl tracking-wider font-oswald'>
                      Contacta con el <span className='font-bold'>Worker</span>
                    </p>
                  </Checkbox>
                  <div className='mt-5 mb-10'>
                    {showSection && (
                      <div>
                        <div className='bg-white h-auto w-full rounded-2xl shadow-[0px_0px_5px_0px_rgba(0,0,0,0.1)]'>
                          <DateAndTime
                            schedule={schedule}
                            services={services}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
      <Footer
        bg={backgroundClasses}
        letters={workeaFooterClasses}
        text={textsFooterClasses}
      ></Footer>
    </>
  );
}
