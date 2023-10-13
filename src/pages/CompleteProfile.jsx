import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { states, CURPValidator } from '../utils/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { VITE_API_URL, VITE_USER_COMPLETE } = import.meta.env;

const schema = Yup.object().shape({
  street: Yup.string().required('La calle y número son requeridos'),
  locality: Yup.string().required('La colonia es requerida'),
  state: Yup.string().required('El estado es requerido'),
  municipality: Yup.string().required('La alcaldía o municipio es requerido'),
  postCode: Yup.string()
    .required('El Codigo Postal es requerido')
    .matches(/^[0-9]+$/, 'Solo se aceptan numeros')
    .test(
      'len',
      'El Numero Postal debe de tener 5 numeros',
      (val) => val.length === 5
    ),

  phone: Yup.string()
    .required('El Telefono es requerido')
    .matches(/^[0-9]+$/, 'Solo se aceptan numeros')
    .test(
      'len',
      'El Telefono debe de tener 10 numeros',
      (val) => val.length === 10
    ),
  CURP: Yup.string()
    .required('El CURP es requerido')
    .test('ValidationCurp', 'El CURP no es valido', (val) => {
      return CURPValidator(val.toUpperCase());
    })
});

//TODO: HANDLE ERRORS WITH MODAL

export default function CompleteProfile() {
  const [selectedState, setSelectedState] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  async function onSubmit(data) {
    console.log(data);
    const token = sessionStorage.getItem('token');
    const userData = {
      address: {
        street: data.street,
        locality: data.locality,
        municipality: data.municipality,
        state: data.state,
        country: 'México',
        postCode: data.postCode
      },
      CURP: data.CURP,
      type: 'user',
      phone: `+52${data.phone}`
    };
    console.log(userData);
    axios
      .patch(`${VITE_API_URL}${VITE_USER_COMPLETE}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        navigate('/dashboard', { replace: true });
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='my-10'>
      <h3 className='text-2xl text-center font-oswald'>
        Completa tu perfil para empezar a{' '}
        <span className='font-bold'>Workear</span>
      </h3>
      <form
        className='flex flex-col gap-3 m-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-3'>
          <h4 className='text-slate-500 font-roboto'>Dirección</h4>
          <Input
            type='text'
            size='sm'
            variant='bordered'
            label='Calle y Numero'
            isRequired
            errorMessage={errors.street?.message}
            isInvalid={!!errors.street}
            {...register('street')}
          />
          <Input
            type='text'
            size='sm'
            variant='bordered'
            isRequired
            label='Colonia'
            errorMessage={errors.locality?.message}
            isInvalid={!!errors.locality}
            {...register('locality')}
          />
          <Select
            isRequired
            size='sm'
            variant='bordered'
            label='Estado'
            errorMessage={errors.state?.message}
            isInvalid={!!errors.state}
            {...register('state', {
              onChange: (event) => {
                setSelectedState(event.target.value);
                resetField('municipality');
                setValue('municipality', '');
              }
            })}
          >
            {Object.keys(states).map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </Select>

          <Select
            isRequired
            size='sm'
            variant='bordered'
            label='Acaldia / Municipio'
            errorMessage={errors.municipality?.message}
            isInvalid={!!errors.municipality}
            {...register('municipality')}
          >
            {selectedState &&
              states[selectedState].map((municipality) => (
                <SelectItem key={municipality} value={municipality}>
                  {municipality}
                </SelectItem>
              ))}
          </Select>
          <div className='flex gap-3'>
            <Input
              type='string'
              size='sm'
              variant='bordered'
              label='Código Postal'
              isRequired
              errorMessage={errors.postCode?.message}
              isInvalid={!!errors.postCode}
              {...register('postCode')}
            />
            <Input
              type='text'
              variant='bordered'
              label='País'
              size='sm'
              isReadOnly
              defaultValue='México'
            />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <h4 className='text-slate-500 font-roboto'>
            Información de contacto
          </h4>
          <Input
            type='string'
            size='sm'
            variant='bordered'
            label='Teléfono'
            isRequired
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
            {...register('phone')}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <Input
            type='text'
            size='sm'
            variant='bordered'
            label='CURP'
            isRequired
            errorMessage={errors.CURP?.message}
            isInvalid={!!errors.CURP}
            {...register('CURP')}
          />
        </div>
        <Button
          size='lg'
          radius='md'
          type='submit'
          className='text-white bg-wkablack font-oswald hover:cursor-pointer'
          startContent={<img src='/arrow-right.svg' alt='next' />}
        >
          COMPLETA
        </Button>
        {}
      </form>
    </div>
  );
}
