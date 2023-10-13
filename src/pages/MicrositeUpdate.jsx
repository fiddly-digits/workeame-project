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
import { useNavigate } from 'react-router-dom';

//TODO: Buscar un placeholder para swiper

const schema = Yup.object().shape({
  aboutMe: Yup.string()
    .notOneOf([''], 'La descripción no puede estar vacía')
    .max(300, 'La descripción debe tener máximo 300 caracteres')
    .min(20, 'La descripción debe tener mínimo 20 caracteres')
});

export default function MicrositeUpdate() {
  const [siteData, setSiteData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [imageError, setImageError] = useState(null);

  const navigate = useNavigate();

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
    fetchMS({ accept: 'application/json' })
      .then((res) => {
        console.log(res);
        setSiteData(res);
        setSelectedTheme(res.theme);
        setSelectedImages(Object.values(res.carousel));
        setSelectedAbout(res.about);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async (data) => {
    setShowSpinner(true);
    console.log(data);
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

    if (serverImages.length > 0 && newImages.length > 0) {
      modifiedData.carousel = serverImages.reduce((acc, image, index) => {
        acc[`image_${index + 1}`] = image;
        return acc;
      }, {});
    }
    console.log(newImages);
    console.log(serverImages);

    console.log(modifiedData);

    if (Object.keys(modifiedData).length > 0) {
      console.log(modifiedData);
      await patchMS(
        {
          'Content-Type': 'multipart/form-data'
        },
        modifiedData
      )
        .then((res) => {
          console.log(res);
          setShowSpinner(false);
          setStatusMessage(
            'Cambios guardados con éxito, seras redirigido a tu dashboard en un 5 segundos'
          );
          setTimeout(() => {
            navigate('/dashboard');
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          setShowSpinner(false);
          setStatusMessage(
            'Hubo un error al guardar tus cambios, contáctenos en contacto@workea.me'
          );
          //TODO: Redirect to form to report error
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
    console.log(images);
  }

  if (!siteData) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spinner color='secondary' label='Cargando...' size='lg' />
      </div>
    );
  }

  return (
    <div className='flex flex-col m-10'>
      <h2 className='w-full mb-8 text-2xl text-slate-500 font-oswald'>
        Modifica tu Sitio
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-center gap-5'>
          <button
            className='w-24 h-24 border-4 rounded-full bg-primary border-secondary'
            type='button'
            onClick={() => setSelectedTheme(1)}
          />
          <button
            className='w-24 h-24 border-4 rounded-full bg-secondary border-third'
            type='button'
            onClick={() => setSelectedTheme(2)}
          />
          <button
            className='w-24 h-24 border-4 rounded-full bg-fourth border-primary'
            type='button'
            onClick={() => setSelectedTheme(3)}
          />
        </div>
        {selectedTheme && (
          <p className='font-bold text-center text-red-400 text-l font-roboto'>
            Has seleccionado el tema {selectedTheme}
          </p>
        )}
        {/* {Object.keys(siteData.carousel).map((key) => (
        <img src={siteData.carousel[key]} alt={key} key={key} />
      ))} */}
        <div className='mt-10'>
          <div className='flex flex-col justify-center w-full my-5 font-roboto md:px-8 lg:px-20'>
            <Swiper
              pagination={{
                type: 'fraction'
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className='mySwiper'
              style={{ height: '400px', width: '400px' }} // set a fixed height for the Swiper container
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
            <div className='flex flex-col items-center gap-2'>
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
                className='bg-wkablack rounded-md max-w-[240px] h-[48px] flex justify-center items-center gap-3 px-5 text-white font-oswald shadow-md hover:bg-[#525252] duration-300 hover:cursor-pointer'
              >
                <img src='/upload.svg' alt='upload' className='w-6 h-6' />
                Selecciona una Foto
              </label>
              {selectedImages.map((image, index) => (
                <label
                  className='flex gap-3 text-sm text-slate-500 text-clip'
                  key={index}
                >
                  {typeof image === 'string'
                    ? `En nuestro server: ${image.substring(
                        image.lastIndexOf('/') + 1
                      )}`
                    : image.name}{' '}
                  <button
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
        <div className='flex justify-center gap-3'>
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
          <Button
            type='submit'
            radius='sm'
            className='px-8 text-white bg-black font-oswald hover:bg-zinc-700 w-60'
          >
            <img src='/arrow-right.svg' alt='arrow' className='w-6 h-6' />
            Guarda tus cambios
          </Button>
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
