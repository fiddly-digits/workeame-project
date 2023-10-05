import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Button, Textarea, Input, Checkbox, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trash } from 'iconoir-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  aboutMe: Yup.string()
    .required('La descripción es requerida')
    .max(300, 'La descripción debe tener máximo 300 caracteres')
    .min(20, 'La descripción debe tener mínimo 20 caracteres'),
  photos: Yup.mixed().test('required', 'La foto es requerida', (photos) => {
    if (!photos) return false;
    return true;
  }),
  'service-1': Yup.string().required('El servicio es requerido'),
  'service-2': Yup.string()
    .notOneOf([''], 'El servicio es requerido')
    .notOneOf(
      [Yup.ref('service-1')],
      'El servicio debe ser diferente a los anteriores'
    ),
  'service-3': Yup.string()
    .notOneOf([''], 'El servicio es requerido')
    .notOneOf(
      [Yup.ref('service-1'), Yup.ref('service-2')],
      'El servicio debe ser diferente a los anteriores'
    ),
  'description-1': Yup.string().required('La descripción es requerida'),
  'description-2': Yup.string().notOneOf([''], 'La descripción es requerida'),
  'description-3': Yup.string().notOneOf([''], 'La descripción es requerida'),
  'price-1': Yup.number()
    .typeError('El precio no debe estar vacío')
    .min(10, 'El precio debe ser mayor a 10'),
  'price-2': Yup.number()
    .typeError('El precio no debe estar vacío')
    .min(10, 'El precio debe ser mayor a 10'),
  'price-3': Yup.number()
    .typeError('El precio no debe estar vacío')
    .min(10, 'El precio debe ser mayor a 10')
});

export default function MicrositeConfiguration() {
  const {
    register,
    handleSubmit,
    control,
    unregister,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [service, setService] = useState([1]); // Estado para almacenar los componentes
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [fetchStatus, setFetchStatus] = useState('');

  //Función para agregar un nuevo componente
  const addService = () => {
    setService([...service, service.length + 1]);
  };

  // Función para quitar el último componente
  const deleteService = () => {
    const newsServices = [...service];
    newsServices.pop();
    unregister(`service-${service.length}`);
    unregister(`description-${service.length}`);
    unregister(`price-${service.length}`);
    unregister(`isPerHour-${service.length}`);
    setService(newsServices);
  };

  const onSubmit = async (data) => {
    setShowSpinner(true);
    console.log(data);
    const token = sessionStorage.getItem('token');
    //console.log(selectedImages);
    if (selectedImages.length < 1) {
      setErrorMessage('Debes subir al menos una imagen');
    }
    //console.log(selectedTheme);
    if (selectedTheme === 0) {
      console.log('Debes seleccionar un tema');
    }
    const micrositeInfo = {
      about: data.aboutMe,
      carousel: selectedImages,
      theme: selectedTheme
    };
    let serviceInfo = {};
    let serviceInfo2 = {};
    let serviceInfo3 = {};

    for (let i = 0; i < service.length; i++) {
      const serviceName = data[`service-${service[i]}`];
      const serviceDescription = data[`description-${service[i]}`];
      const servicePrice = data[`price-${service[i]}`];
      const serviceIsPerHour = data[`isPerHour-${service[i]}`];

      if (i === 0) {
        serviceInfo = {
          name: serviceName,
          description: serviceDescription,
          price: servicePrice,
          isPerHour: serviceIsPerHour
        };
      } else if (i === 1) {
        serviceInfo2 = {
          name: serviceName,
          description: serviceDescription,
          price: servicePrice,
          isPerHour: serviceIsPerHour
        };
      } else if (i === 2) {
        serviceInfo3 = {
          name: serviceName,
          description: serviceDescription,
          price: servicePrice,
          isPerHour: serviceIsPerHour
        };
      }
    }

    console.log(data);
    let responses = [];
    if (Object.keys(micrositeInfo).length !== 0)
      responses.push(micrositePost(micrositeInfo, token));
    if (Object.keys(serviceInfo).length !== 0)
      responses.push(servicePost(serviceInfo, token));
    if (Object.keys(serviceInfo2).length !== 0)
      responses.push(servicePost(serviceInfo2, token));
    if (Object.keys(serviceInfo3).length !== 0)
      responses.push(servicePost(serviceInfo3, token));

    console.log('responses', responses);

    Promise.all(responses)
      .then((responses) => {
        console.log(responses);
        setShowSpinner(false);
        setFetchStatus('Tu micrositio y servicios han sido creados');
        setTimeout(() => {
          navigate('/dashboard/schedule');
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        setShowSpinner(false);
        setFetchStatus(error.response.data.message);
        setTimeout(() => {
          location.reload();
        }, 5000);
      });

    // axios
    //   .post('http://localhost:8080/api/v1/ms/create/', micrositeInfo, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then((response) => {
    //     console.log('Aqui tendria que redirigirte', response);
    //     navigate('/dashboard/service-config');
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.response.data.message);
    //   });
  };

  function micrositePost(micrositeInfo, token) {
    return axios.post(
      'http://localhost:8080/api/v1/ms/create/',
      micrositeInfo,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  function servicePost(serviceInfo, token) {
    return axios.post(
      'http://localhost:8080/api/v1/service/create/',
      serviceInfo,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  async function onChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      if (selectedImages.length >= 5) {
        setErrorMessage('Solo puedes subir un máximo de 5 imágenes');
        return;
      }
      setErrorMessage('');
      const imageFile = [...selectedImages, event.target.files[0]];
      setSelectedImages(imageFile);
    }
  }

  async function OnDeleteImage(index) {
    const images = [...selectedImages];
    images.splice(index, 1);
    setSelectedImages(images);
  }

  return (
    <>
      <div className='bg-fourth'>
        <main className='flex flex-col h-full gap-10 py-10 m-auto md:px-10 '>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className='flex flex-col gap-3 mx-10 md:mx-40'>
              <h2 className='flex justify-center text-3xl text-center font-oswald'>
                ¡Muestra tu trabajo al mundo!
              </h2>
              <p className='flex justify-center text-lg text-center text-gray-500 font-roboto'>
                ¡Elige tu diseño favorito!
              </p>
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
              {selectedTheme ? (
                <p className='font-bold text-center text-red-400 text-l font-roboto'>
                  Has seleccionado el tema {selectedTheme}
                </p>
              ) : (
                <p className='font-bold text-center text-l font-roboto'>
                  Selecciona un Tema
                </p>
              )}

              <div className='mt-10'>
                <p className='flex items-center justify-center text-lg text-center text-gray-500 font-roboto'>
                  Agrega unas fotos de tu trabajo
                </p>
                <p className='flex items-center justify-center text-lg text-center text-gray-500 font-roboto'>
                  No te preocupes si no tienes mas de una podrás modificarlas
                  mas tarde
                </p>
                <div className='flex justify-center w-full my-5 font-roboto md:px-8 lg:px-20'>
                  <Swiper
                    pagination={{
                      type: 'fraction'
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className='mySwiper'
                  >
                    {selectedImages.map((image) => (
                      <SwiperSlide key={image.name}>
                        <div className='flex justify-center w-full'>
                          <div className='p-10 w-80 h-80 md:w-96 md:h-96'>
                            <img
                              src={URL.createObjectURL(image)}
                              alt={image.name}
                              className='object-cover w-full h-full '
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <input
                  accept='image/*'
                  type='file'
                  multiple='multiple'
                  hidden
                  id='file-uploader'
                  {...register('photos', {
                    onChange: onChange
                  })}
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
                    {image.name}{' '}
                    <button
                      type='button'
                      onClick={() => {
                        OnDeleteImage(index);
                        setErrorMessage('');
                      }}
                    >
                      <Trash />
                    </button>
                  </label>
                ))}
                {errorMessage && (
                  <p className='text-red-400 text-l font-roboto'>
                    {errorMessage}
                  </p>
                )}
                {/* {selectedImage && (
                  <label className='text-sm text-slate-500 text-clip'>
                    {selectedImage[0].name}
                  </label>
                )} */}
                {errors.photos && (
                  <label className='text-sm text-slate-500'>
                    {errors.photos.message}
                  </label>
                )}
              </div>
            </section>
            <section className='flex flex-col items-center gap-3 mx-10 my-8 md:mx-40'>
              <p className='flex justify-center text-lg font-oswald'>
                Cuéntale a tus clientes de qué va tu trabajo{' '}
              </p>
              <p className='flex justify-center text-2xl font-bold font-oswald'>
                ¡Queremos acercarlos a ti!
              </p>
              {/* textarea "about me" */}
              <div className='flex justify-center w-full my-4 md:max-w-xl'>
                <Textarea
                  variant='bordered'
                  placeholder='Cuéntanos sobre ti...'
                  description='Esta información aparecerá en tu descripción. Max. 300 caracteres.'
                  className='w-full max-w-xl font-roboto'
                  errorMessage={errors.aboutMe?.message}
                  isInvalid={!!errors.aboutMe}
                  {...register('aboutMe')}
                />
              </div>
            </section>
            {/* services details */}
            <section className='flex flex-col items-center gap-3 mx-10 my-8'>
              <div className='flex flex-col items-center w-full gap-3 '>
                <h2 className='flex justify-center text-3xl text-center font-oswald'>
                  ¡Agrega hasta 3 servicios!
                </h2>
                {service.map((index) => (
                  <fieldset
                    key={index}
                    className='flex flex-col items-center w-full gap-3 '
                  >
                    <h4 className='font-roboto'>
                      Detalles del Servicio #{index}
                    </h4>
                    <Input
                      size='sm'
                      label='Servicio'
                      variant='bordered'
                      type='text'
                      errorMessage={errors[`service-${index}`]?.message}
                      isInvalid={!!errors[`service-${index}`]}
                      className='w-full max-w-xl font-roboto'
                      {...register(`service-${index}`)}
                    />
                    <Textarea
                      label='Descripción'
                      variant='bordered'
                      type='text'
                      errorMessage={errors[`description-${index}`]?.message}
                      isInvalid={!!errors[`description-${index}`]}
                      className='w-full max-w-xl font-roboto'
                      {...register(`description-${index}`)}
                    />
                    <div className='flex w-full max-w-xl gap-3'>
                      <Input
                        size='sm'
                        label='Precio'
                        variant='bordered'
                        placeholder='0.00'
                        type='number'
                        errorMessage={errors[`price-${index}`]?.message}
                        isInvalid={!!errors[`price-${index}`]}
                        startContent={
                          <div className='flex items-center pointer-events-none'>
                            <span className='text-default-400 text-small'>
                              $
                            </span>
                          </div>
                        }
                        {...register(`price-${index}`)}
                      />
                      <Controller
                        name={`isPerHour-${index}`}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Checkbox
                            label='Es por hora'
                            color='secondary'
                            {...field}
                            onChange={(event) =>
                              field.onChange(event.target.checked)
                            }
                          >
                            <span className='text-sm font-roboto whitespace-nowrap'>
                              Es por hora
                            </span>
                          </Checkbox>
                        )}
                      />
                    </div>
                  </fieldset>
                ))}
              </div>
              <div className='flex flex-row gap-16 my-10 '>
                {service.length < 3 && (
                  <Button
                    radius='sm'
                    className='w-auto px-8 text-black bg-transparent border border-black font-oswald hover:bg-wkablack hover:text-white'
                    onClick={addService}
                  >
                    Agregar Servicio
                  </Button>
                )}
                {service.length > 1 && (
                  <Button
                    radius='sm'
                    className='w-auto px-8 text-black bg-transparent border border-black font-oswald hover:bg-wkablack hover:text-white'
                    onClick={deleteService}
                  >
                    Eliminar Servicio
                  </Button>
                )}
              </div>
            </section>
            <div className='flex flex-col items-center justify-center gap-3'>
              <Button
                type='submit'
                radius='sm'
                className='px-8 text-white bg-black font-oswald hover:bg-zinc-700 w-60'
              >
                <img src='/arrow-right.svg' alt='arrow' className='w-6 h-6' />
                Siguiente
              </Button>
              {showSpinner && <Spinner color='secondary' label='Cargando...' />}
              {fetchStatus && (
                <p className='text-red-400 text-l font-roboto'>{fetchStatus}</p>
              )}
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
