import { Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { passwordResetRequest } from '../utils/fetch';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('El email no es válido')
    .required('El email es requerido')
});

export default function RequestPasswordChange() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [statusMessage, setStatusMessage] = useState();

  async function onSubmit(data) {
    passwordResetRequest(data)
      .then((res) => {
        setStatusMessage(res.data.message);
      })
      .catch((err) => {
        setStatusMessage(err.response.data.message);
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
          Solicita tu cambio de contraseña empezar a{' '}
          <span className='mx-1 font-bold md:mx-2'>WORKEAR</span>
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
          {statusMessage && (
            <div className='flex justify-center text-red-400 font-roboto'>
              {statusMessage}
            </div>
          )}
          <div className='flex justify-center m-10 '>
            {statusMessage ? (
              <Button
                as={Link}
                to={'/login'}
                size='lg'
                radius='md'
                className='text-white bg-wkablack font-oswald hover:cursor-pointer'
                startContent={<img src='/arrow-right.svg' alt='next' />}
              >
                REGRESA
              </Button>
            ) : (
              <Button
                size='lg'
                radius='md'
                type='submit'
                className='text-white bg-wkablack font-oswald hover:cursor-pointer'
                startContent={<img src='/arrow-right.svg' alt='next' />}
              >
                VERIFICA
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
