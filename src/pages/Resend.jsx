import { Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { VITE_API_URL } = process.env;

const schema = Yup.object().shape({
  email: Yup.string()
    .email('El email no es válido')
    .required('El email es requerido')
});

export default function Resend() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();

  async function onSubmit(data) {
    axios
      .post(`${VITE_API_URL}auth/resend`, data)
      .then((res) => {
        if (res)
          setSuccessMessage(
            'Se ha enviado un nuevo correo de verificación, seras redirigido al login'
          );
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <div className='items-center h-screen bg-fourth'>
      <div className='absolute inset-0 z-0 right-[20rem] lg:right-[30rem] lg:top-[3rem] top-[32rem] md:top-[28rem] '>
        <h1 className=' text-primary/40 -rotate-90 font-oswald  text-[15rem] font-bold '>
          Workea
        </h1>
      </div>
      <main className='container relative z-10 py-5 mx-auto'>
        <h2 className='flex justify-center m-5 mt-20 text-2xl font-oswald'>
          Compártenos el correo que registraste en{' '}
          <span className='mx-1 font-bold md:mx-2'>WORKEA</span>
        </h2>
        <form
          className='flex flex-col gap-[20px] justify-center mx-auto w-96 my-10'
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
          {errorMessage && (
            <div className='flex justify-center text-red-400 font-roboto'>
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className='flex justify-center text-wkablack/40 font-roboto'>
              {successMessage}
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
              REENVIA
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
