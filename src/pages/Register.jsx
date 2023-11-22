import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';

const { VITE_API_URL } = process.env;

const schema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  email: Yup.string()
    .email('El email no es válido')
    .required('El email es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(8, 'Debe contener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(
      /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/,
      'Debe contener al menos un cáracter especial'
    ),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('La contraseña es requerida'),
  photo: Yup.mixed().test('required', 'La foto es requerida', (photo) => {
    if (!photo) return false;
    return true;
  })
});

export default function Register() {
  //const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  //const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');

  async function onSubmit(data) {
    const userInfo = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      photo: selectedImage[0]
    };
    axios
      .post(`${VITE_API_URL}user/register`, userInfo, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => {
        if (response) {
          setRegistrationStatus('Registro exitoso');
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        if (error) {
          setRegistrationStatus('Ha habido un error al registrarte');
          setErrorMessage(error.response.data.message);
          setIsModalOpen(true);
        }
      });
  }

  async function onChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files;
      setSelectedImage(imageFile);
    }
  }

  return (
    <div className='bg-fourth'>
      <div className='absolute inset-0 z-0 right-[20rem] lg:right-[30rem] lg:top-[3rem] top-[32rem] md:top-[28rem] '>
        <h1 className=' text-primary/40 -rotate-90 font-oswald  text-[15rem] font-bold '>
          Workea
        </h1>
      </div>
      <main className='container relative z-10 py-3 mx-auto'>
        <h2 className='flex justify-center m-5 text-2xl font-oswald'>
          Regístrate para empezar a{' '}
          <span className='mx-1 font-bold md:mx-2'>WORKEAR</span>
        </h2>
        <h3 className='flex justify-center m-5 text-md font-oswald'>
          {' '}
          Ya tienes una cuenta?{' '}
          <a className='mx-1 font-bold md:mx-2' href='/Login'>
            INGRESA
          </a>
        </h3>
        <form
          className='flex flex-col gap-[20px] justify-center mx-auto'
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className='flex flex-col items-center gap-3'>
            <div className='flex flex-col justify-between gap-3 mx-auto w-96 '>
              <Input
                type='text'
                label='Nombre'
                size='sm'
                isClearable
                isRequired
                variant='bordered'
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                {...register('name')}
              />
              <Input
                type='text'
                label='Apellido'
                size='sm'
                isRequired
                isClearable
                variant='bordered'
                errorMessage={errors.lastName?.message}
                isInvalid={!!errors.lastName}
                {...register('lastName')}
              />
              <Input
                type='email'
                label='Email'
                size='sm'
                isRequired
                isClearable
                variant='bordered'
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                {...register('email')}
              />
              <Input
                type='password'
                label='Contraseña'
                size='sm'
                isRequired
                variant='bordered'
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                {...register('password')}
              />
              <Input
                type='password'
                label='Confirmar contraseña'
                size='sm'
                isRequired
                variant='bordered'
                errorMessage={errors.repeatPassword?.message}
                isInvalid={!!errors.repeatPassword}
                {...register('repeatPassword')}
              />
            </div>
          </section>
          <div className='flex flex-col gap-8 items-center w-[100%]'>
            <div className='max-w-[241px] max-h-[300px] overflow-hidden'>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage[0])}
                  alt='preview'
                  className='object-cover w-48 h-48 max-w-full min-w-full rounded-full shrink-0'
                />
              )}
            </div>

            <div className='flex flex-col items-center gap-2'>
              <input
                accept='image/*'
                type='file'
                hidden
                id='file-uploader'
                {...register('photo', {
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
              {selectedImage && (
                <label className='text-sm text-slate-500 text-clip'>
                  {selectedImage[0].name}
                </label>
              )}
              {errors.photo && (
                <label className='text-sm text-slate-500'>
                  {errors.photo.message}
                </label>
              )}
            </div>
          </div>
          <div className='flex justify-center m-10 '>
            <Button
              size='lg'
              radius='md'
              type='submit'
              className='text-white bg-wkablack font-oswald hover:cursor-pointer'
              startContent={<img src='/arrow-right.svg' alt='next' />}
            >
              REGISTRATE
            </Button>
            {isModalOpen && registrationStatus && (
              <RegisterModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                registrationStatus={registrationStatus}
                errorMessage={errorMessage}
              />
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

function RegisterModal({
  isModalOpen,
  setIsModalOpen,
  registrationStatus,
  errorMessage
}) {
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {registrationStatus}
            </ModalHeader>
            <ModalBody>
              <p className='text-red-500 font-roboto'>
                {errorMessage
                  ? errorMessage
                  : 'En Breve recibirás un correo donde podrás verificar tu cuenta.'}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                className='text-white bg-wkablack font-oswald'
                onPress={() => {
                  onClose();
                  if (registrationStatus === 'Registro exitoso') {
                    navigate('/Login');
                  }
                }}
              >
                Entendido!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
