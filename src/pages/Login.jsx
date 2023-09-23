import { Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('El email no es válido')
    .required('El email es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .matches(/^[a-zA-Z0-9!@#$%^&*]{8,}$/, 'Debe contener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*]/, 'Debe contener al menos un cáracter especial')
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [errorMessage, setErrorMessage] = useState();

  async function onSubmit(data) {
    console.log(data);
    axios
      .post('http://localhost:8080/api/v1/auth/login', data)
      .then((res) => {
        console.log(res.data.token);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <div className='bg-fourth'>
      <div className='absolute inset-0 z-0 right-[40rem] top-[45rem] md:top-32 '>
        <h1 className=' text-primary/50 -rotate-90 font-oswald  text-[380px] font-bold '>
          Workea
        </h1>
      </div>
      <main className='container relative z-10 py-5 mx-auto'>
        <h2 className='flex justify-center m-5 text-2xl font-oswald'>
          Ingresa para empezar a{' '}
          <span className='mx-1 font-bold md:mx-2'>WORKEAR</span>
        </h2>
        <h3 className='flex justify-center m-5 text-md font-oswald'>
          {' '}
          Aun no tienes una cuenta?{' '}
          <a className='mx-1 font-bold md:mx-2' href='/register'>
            REGISTRATE
          </a>
        </h3>
        <form
          className='flex flex-col gap-[20px] justify-center mx-auto'
          onSubmit={handleSubmit(onSubmit)}
        >
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
          {errorMessage && (
            <div className='flex justify-center text-red-400 font-roboto'>
              {errorMessage}
            </div>
          )}
          <div className='flex justify-center m-10 '>
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