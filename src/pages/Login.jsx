import { Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { EyeAlt, EyeClose } from 'iconoir-react';

const { VITE_API_URL } = process.env;

const schema = Yup.object().shape({
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
    )
});

export default function Login() {
  const userData = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [errorMessage, setErrorMessage] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);
  async function onSubmit(data) {
    axios
      .post(`${VITE_API_URL}auth/login`, data)
      .then((res) => {
        sessionStorage.setItem('token', res.data?.token);
        navigate('/dashboard', { replace: true }, { state: userData });
        location.reload();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <div className='flex items-center h-screen md:max-h-[50rem] bg-fourth'>
      <div className='absolute inset-0 z-0 right-[20rem] lg:right-[30rem] lg:top-[3rem] top-[32rem] md:top-[28rem] '>
        <h1 className=' text-primary/40 -rotate-90 font-oswald  text-[15rem] font-bold '>
          Workea
        </h1>
      </div>
      <main className='z-10 flex flex-col h-full py-20 mx-auto my-10 '>
        <h2 className='flex justify-center text-2xl md:text-3xl font-oswald'>
          Ingresa para empezar a{' '}
          <span className='mx-1 font-bold md:mx-2'>WORKEAR</span>
        </h2>
        <h3 className='flex justify-center m-8 text-lg font-oswald'>
          {' '}
          Aun no tienes una cuenta?{' '}
          <a className='mx-1 font-bold md:mx-2' href='/register'>
            REGISTRATE
          </a>
        </h3>
        <form
          className='flex flex-col mt-8 mb-8 gap-[30px] justify-center mx-auto w-[20rem] md:max-w-[30rem] '
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type='email'
            label='Email'
            size='sm'
            isRequired
            isClearable
            className='font-roboto'
            variant='bordered'
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            {...register('email')}
          />
          <Input
            type={isVisible ? 'text' : 'password'}
            label='Contraseña'
            size='sm'
            className='font-roboto'
            isRequired
            variant='bordered'
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeAlt strokeWidth={1} />
                ) : (
                  <EyeClose strokeWidth={1} />
                )}
              </button>
            }
            {...register('password')}
          />
          {errorMessage && (
            <div className='flex justify-center text-red-400 font-roboto'>
              {errorMessage}
            </div>
          )}
          <h3 className='self-center m-5 text-md font-oswald'>
            {' '}
            Olvidaste tu Password?
            <Link
              to='/forgot-password'
              className='font-extrabold hover:text-primary'
            >
              {' '}
              RECUPÉRALO
            </Link>
          </h3>
          <h3 className='self-center m-5 text-md font-oswald'>
            {' '}
            Problemas para verificar tu correo?{' '}
          </h3>
          <a className='mx-1 font-bold font-oswald md:mx-2' href='/resend'>
            SOLICITA UN NUEVO CORREO DE VERIFICACIÓN
          </a>
          <div className='flex justify-center m-10'>
            <Button
              size='lg'
              radius='md'
              type='submit'
              className='text-white bg-wkablack font-oswald hover:cursor-pointer'
              startContent={<img src='/arrow-right.svg' alt='next' />}
            >
              INGRESA
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
