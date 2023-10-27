import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchMS, patchMS } from '../utils/fetch';
import { Trash } from 'iconoir-react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea, Button, Spinner } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useUser } from '../utils/UserContext';

//TODO: Buscar un placeholder para swiper

const schema = Yup.object().shape({
  aboutMe: Yup.string()
    .notOneOf([''], 'La descripción no puede estar vacía')
    .max(300, 'La descripción debe tener máximo 300 caracteres')
    .min(20, 'La descripción debe tener mínimo 20 caracteres')
});

export default function MicrositeUpdate() {
  const { userData, setUserData } = useUser();
  const [siteData, setSiteData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [imageInitialIndex, setImageInitialIndex] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    fetchMS({ accept: 'application/json' }, userData)
      .then((res) => {
        setSiteData(res);
        setSelectedTheme(res.theme);
        setSelectedImages(Object.values(res.carousel));
        setImageInitialIndex(Object.values(res.carousel).length);
        setSelectedAbout(res.about);
      })
      .catch((err) => {
        if (err) {
          setStatusMessage(
            'Hubo un error obteniendo los datos del servidor contáctenos en contacto@workea.me'
          );
        }
      });
  }, []);

  const onSubmit = async (data) => {
    setShowSpinner(true);
    let modifiedData = {};
    let newImages = [];
    let serverImages = [];

    if (selectedTheme !== siteData.theme) {
      modifiedData.theme = selectedTheme;
    }
    if (selectedImages.length < 1) {
      setImageError('Debes tener al menos una imagen');
      return;
    }
    if (data.aboutMe !== siteData.about) {
      modifiedData.about = data.aboutMe;
    }

    selectedImages.forEach((image) => {
      if (typeof image === 'string') {
        serverImages.push(image);
      } else {
        newImages.push(image);
      }
    });
    if (newImages.length > 0) {
      modifiedData.newImages = newImages;
    }

    if (
      serverImages.length > 0 ||
      newImages.length > 0 ||
      selectedImages.length != imageInitialIndex
    ) {
      modifiedData.carousel = serverImages.reduce((acc, image, index) => {
        acc[`image_${index + 1}`] = image;
        return acc;
      }, {});
    }
    if (Object.keys(modifiedData).length > 0) {
      await patchMS(
        {
          'Content-Type': 'multipart/form-data'
        },
        modifiedData
      )
        .then((res) => {
          setShowSpinner(false);
          if (res) setStatusMessage('Cambios guardados con éxito');
        })
        .catch((err) => {
          setShowSpinner(false);
          if (err)
            setStatusMessage(
              'Hubo un error al guardar tus cambios, contáctenos en contacto@workea.me'
            );
        });
    }
  };

  async function onChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      if (selectedImages.length >= 5) {
        setImageError('Solo puedes subir un máximo de 5 imágenes');
        return;
      }
      setImageError('');
      const imageFile = [...selectedImages, event.target.files[0]];
      setSelectedImages(imageFile);
    }
  }
  async function OnDeleteImage(index) {
    const images = [...selectedImages];
    images.splice(index, 1);
    setSelectedImages(images);
  }

  if (!siteData) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spinner color='secondary' label='Cargando...' size='lg' />
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center m-auto w-80 md:w-full'>
      <h2 className='w-full m-8 text-2xl text-black font-oswald'>
        Modifica tu Sitio
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className='mb-8 text-lg text-center font-oswald text-zinc-400'>
          Cambia tu tema
        </h3>
        <div className='flex items-center justify-center gap-8'>
          <button
            className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-third ${
              selectedTheme === 1
                ? 'shadow-[0_0px_40px_-2px_rgba(0,0,0,0.8)] shadow-secondary scale-110 transition-all duration-500 ease-in-out'
                : ''
            }`}
            type='button'
            onClick={() => setSelectedTheme(1)}
          />
          <button
            className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary  ${
              selectedTheme === 2
                ? 'shadow-[0_0px_40px_-4px_rgba(0,0,0,0.8)] shadow-third scale-110 transition-all duration-500 ease-in-out'
                : ''
            }`}
            type='button'
            onClick={() => setSelectedTheme(2)}
          />
          <button
            className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-fourth ${
              selectedTheme === 3
                ? 'shadow-[0_0px_40px_-4px_rgba(0,0,0,0.5)] shadow-secondary scale-110 transition-all duration-500 ease-in-out'
                : ''
            }`}
            type='button'
            onClick={() => setSelectedTheme(3)}
          />
        </div>
        {selectedTheme && (
          <p className='mt-8 font-bold text-center text-red-400 text-l font-roboto'>
            Has seleccionado el tema {selectedTheme}
          </p>
        )}
        {/* {Object.keys(siteData.carousel).map((key) => (
        <img src={siteData.carousel[key]} alt={key} key={key} />
      ))} */}
        <div className='mt-10'>
          <h3 className='text-lg text-center font-oswald text-zinc-400'>
            Agrega o elimina fotos de tu trabajo
          </h3>
          <div className='flex flex-col items-center w-full font-roboto md:px-8 lg:px-20'>
            <div className='flex justify-center w-full max-w-80 md:max-w-xl font-roboto md:px-8 lg:px-20'>
              <Swiper
                pagination={{
                  type: 'fraction'
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className='mySwiper'
              >
                {selectedImages.map((image) => (
                  <SwiperSlide
                    key={
                      typeof image === 'string'
                        ? `${image.substring(image.lastIndexOf('/') + 1)}`
                        : image.name
                    }
                  >
                    <div className='flex justify-center w-full'>
                      <div className='p-10 w-80 h-80 md:w-96 md:h-96'>
                        <img
                          src={
                            typeof image === 'string'
                              ? image
                              : URL.createObjectURL(image)
                          }
                          alt={image.name}
                          className='object-cover w-full h-full '
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='flex flex-col items-center gap-3 mt-5'>
              <input
                accept='image/*'
                type='file'
                multiple='multiple'
                hidden
                id='file-uploader'
                onChange={onChange}
              />
              <label
                htmlFor='file-uploader'
                className='bg-wkablack mb-5 rounded-md max-w-[240px] h-[48px] flex justify-center items-center gap-3 px-5 text-white font-oswald shadow-md hover:bg-[#525252] duration-300 hover:cursor-pointer my-2'
              >
                <img src='/upload.svg' alt='upload' className='w-6 h-6' />
                Selecciona una Foto
              </label>
              {selectedImages.map((image, index) => (
                <label
                  className='flex justify-between gap-5 text-sm text-gray-300 w-80 md:auto text-clip'
                  key={index}
                >
                  {typeof image === 'string'
                    ? `En nuestro server: ${image.substring(
                        image.lastIndexOf('/') + 1
                      )}`
                    : image.name}{' '}
                  <button
                    className='text-gray-400 transition-all duration-200 hover:animate-bounce'
                    type='button'
                    onClick={() => {
                      OnDeleteImage(index);
                      setImageError('');
                    }}
                  >
                    <Trash />
                  </button>
                </label>
              ))}
              {imageError && (
                <p className='text-red-400 text-l font-roboto'>{imageError}</p>
              )}
              {/* {errors.photos && (
                <label className='text-sm text-slate-500'>
                  {errors.photos.message}
                </label>
              )} */}
            </div>
            <h3 className='mt-10 mb-5 text-lg text-center font-oswald text-zinc-400'>
              Modifica tu descripción
            </h3>
            <div className='flex justify-center w-full mb-10 md:max-w-xl'>
              <Textarea
                variant='bordered'
                placeholder='Cuéntanos sobre ti...'
                value={selectedAbout}
                description='Esta información aparecerá en tu descripción. Max. 300 caracteres.'
                className='self-center w-full max-w-xl font-roboto'
                errorMessage={errors.aboutMe?.message}
                isInvalid={!!errors.aboutMe}
                {...register('aboutMe', {
                  onChange: (e) => setSelectedAbout(e.target.value)
                })}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-center gap-3'>
          {!statusMessage && (
            <Button
              type='button'
              radius='sm'
              className='px-8 text-white bg-black font-oswald hover:bg-zinc-700 w-60'
              onPress={() => {
                setSelectedTheme(siteData.theme);
                setSelectedImages(Object.values(siteData.carousel));
                setSelectedAbout(siteData.about);
                setImageError('');
                reset();
              }}
            >
              <img
                src='/x.svg'
                alt='arrow'
                className='w-6 h-6'
                style={{ filter: 'invert(1)' }}
              />
              Cancela los cambios
            </Button>
          )}
          {statusMessage ? (
            <Button
              as={Link}
              to={'/dashboard'}
              size='md'
              radius='sm'
              className='px-8 text-white bg-black font-oswald hover:bg-zinc-700 w-60'
              startContent={<img src='/arrow-right.svg' alt='next' />}
            >
              Regresa
            </Button>
          ) : (
            <Button
              size='md'
              type='submit'
              radius='sm'
              className='px-8 text-white bg-black font-oswald hover:bg-zinc-700 w-60'
              startContent={<img src='/arrow-right.svg' alt='next' />}
            >
              Guarda tus Cambios
            </Button>
          )}
          {/* <Button
            type='submit'
            radius='sm'
            className='px-8 text-white bg-black font-oswald hover:bg-zinc-700 w-60'
          >
            <img src='/arrow-right.svg' alt='arrow' className='w-6 h-6' />
            Guarda tus cambios
          </Button> */}
        </div>
        <div className='flex justify-center pt-5'>
          {showSpinner && (
            <Spinner color='secondary' label='Guardando tus cambios...' />
          )}
          {statusMessage && (
            <p className='text-red-400 text-l font-roboto'>{statusMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}
