import { Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeAlt, EyeClose } from 'iconoir-react';
import Cookie from 'js-cookie';

// TODO: Password Recovery on Login Page

const schema = Yup.object().shape({
  oldPassword: Yup.lazy((value) =>
    !value
      ? Yup.string()
      : Yup.string()
          .required('La contraseña es requerida')
          .min(8, 'Debe contener al menos 8 caracteres')
          .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
          .matches(/[0-9]/, 'Debe contener al menos un número')
          .matches(
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/,
            'Debe contener al menos un cáracter especial'
          )
  ),
  newPassword: Yup.lazy((value) =>
    !value
      ? Yup.string()
      : Yup.string()
          .required('La contraseña es requerida')
          .min(8, 'Debe contener al menos 8 caracteres')
          .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
          .matches(/[0-9]/, 'Debe contener al menos un número')
          .matches(
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/,
            'Debe contener al menos un cáracter especial'
          )
          .notOneOf(
            [Yup.ref('oldPassword'), null],
            'La contraseña nueva debe ser diferente a la actual'
          )
  )
});

export default function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isOldVisible, setIsOldVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState();

  const toggleNewVisibility = () => setIsNewVisible(!isNewVisible);
  const toggleOldVisibility = () => setIsOldVisible(!isOldVisible);

  async function onSubmit(data) {
    console.log(data);
    const token = sessionStorage.getItem('token');
    axios
      .patch('http://localhost:8080/api/v1/user/passwordChange/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res);
        sessionStorage.removeItem('token');
        Cookie.remove('userData');
        navigate('/login', { replace: true });
        window.location.reload();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }
  return (
    <div className='flex flex-col m-10'>
      <h2 className='w-full mb-8 text-2xl text-black font-oswald'>
        Modifica tu Password
      </h2>
      <form
        className='flex flex-col items-center gap-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className='m-8 text-gray-500 font-roboto'>
          {' '}
          Al modificar tu Password tendras que volver a ingresar con el nuevo
          password.
        </p>
        <Input
          type={isOldVisible ? 'text' : 'password'}
          label='Contraseña Actual'
          size='sm'
          className='font-roboto'
          isRequired
          variant='bordered'
          errorMessage={errors.oldPassword?.message}
          isInvalid={!!errors.oldPassword}
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleOldVisibility}
            >
              {isOldVisible ? (
                <EyeAlt strokeWidth={1} />
              ) : (
                <EyeClose strokeWidth={1} />
              )}
            </button>
          }
          {...register('oldPassword')}
        />
        <Input
          type={isNewVisible ? 'text' : 'password'}
          label='Nueva Contraseña'
          size='sm'
          className='font-roboto'
          isRequired
          variant='bordered'
          errorMessage={errors.newPassword?.message}
          isInvalid={!!errors.newPassword}
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleNewVisibility}
            >
              {isNewVisible ? (
                <EyeAlt strokeWidth={1} />
              ) : (
                <EyeClose strokeWidth={1} />
              )}
            </button>
          }
          {...register('newPassword')}
        />
        {errorMessage && (
          <div className='flex justify-center text-red-400 font-roboto'>
            {errorMessage}
          </div>
        )}
        <Button
          size='lg'
          radius='md'
          type='submit'
          className='mt-5 text-white bg-wkablack font-oswald hover:cursor-pointer'
          {...(!errors.oldPassword && !errors.newPassword
            ? { isDisabled: false }
            : { isDisabled: true })}
          startContent={<img src='/arrow-right.svg' alt='next' />}
        >
          CAMBIA
        </Button>
      </form>
    </div>
  );
}
