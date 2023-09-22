//import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonBlack from '../components/ButtonBlack';
import { useForm } from 'react-hook-form';
import { RegistrationData } from '../utils/common.types';
import * as Yup from 'yup';
import { Input } from '@nextui-org/react';
import { usePost } from '../hooks/UseFetch';
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react';

const schema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  email: Yup.string()
    .email('El email no es válido')
    .required('El email es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .matches(/^[a-zA-Z0-9!@#$%^&*]{8,}$/, 'Debe contener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*]/, 'Debe contener al menos un cáracter especial'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('La contraseña es requerida')
});

export default function Register() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [data, setData] = useState<object>();
  const [start, setStart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(data: RegistrationData) {
    console.log(data);
    const userInfo = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      photo: 'this is a test'
    };
    setData(userInfo);
    setStart(true);
  }

  const postResult = usePost({
    path: '/user/register',
    start,
    data
  });

  useEffect(() => {
    if (!postResult) return;
    console.log(postResult);
    console.log((postResult as { message?: string }[])[0]?.message ?? 'Error');
    if (
      !postResult[0] ||
      (postResult as { success?: boolean }[])[0]?.success === true
    ) {
      setShowModal(false);
      setErrorMessage('Error');
    } else {
      setErrorMessage(
        (postResult as { message?: string }[])[0]?.message ?? 'Error'
      );
      setShowModal(true);
    }
    setStart(false);
  }, [onOpenChange, postResult]);

  return (
    <div className='bg-fourth'>
      <div className='absolute inset-0 z-0 right-[40rem] top-[45rem] md:top-32 '>
        <h1 className=' text-primary/50 -rotate-90 font-oswald  text-[380px] font-bold '>
          Workea
        </h1>
      </div>
      <main className='container relative z-10 py-5 mx-auto'>
        <h2 className='flex justify-center m-5 text-2xl font-oswald'>
          Regístrate para empezar a{' '}
          <span className='mx-1 font-bold md:mx-2'>WORKEAR</span>
        </h2>
        <form
          className='flex flex-col gap-[20px] justify-center mx-auto'
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <section className='flex flex-col items-center gap-3'>
            <div className='flex flex-col justify-between gap-3 mx-auto md:w-full'>
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
            <div className='w-[241px] h-[300px] bg-slate-300 rounded-t-[20px] mb-10'>
              <img
                src='/pictures/mujer1.jpg'
                alt='woman'
                className='h-fill rounded-t-md w-fill'
              />
            </div>

            <ButtonBlack
              type='button'
              icon='upload'
              action='Subir foto'
              reference=''
            ></ButtonBlack>
          </div>
          <div className='flex justify-center m-10 '>
            <Button
              size='lg'
              radius='md'
              type='submit'
              className='text-white bg-wkablack font-oswald hover:cursor-pointer'
              onPress={onOpen}
              startContent={<img src='/arrow-right.svg' alt='next' />}
            >
              REGISTRATE
            </Button>
            {showModal && (
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                placement='center'
                shouldBlockScroll={true}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className='flex flex-col gap-1'>
                        Ha habido un problema
                      </ModalHeader>
                      <ModalBody>{errorMessage}</ModalBody>
                      <ModalFooter>
                        <Button
                          color='danger'
                          variant='light'
                          onPress={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
