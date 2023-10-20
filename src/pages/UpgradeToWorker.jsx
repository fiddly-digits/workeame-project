import { Select, SelectItem, Button, Input } from '@nextui-org/react';
import { categories, expertise } from '../utils/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, Navigate } from 'react-router-dom';
import ChangeText from '../components/ChangeText';
import { clabe } from 'clabe-validator';
import { useState } from 'react';
import { patchUser } from '../utils/fetch';
import { useUser } from '../utils/UserContext';
import { isProtectedDashboardRoute } from '../utils/utils';

const schema = Yup.object().shape({
  expYears: Yup.string().required('Especificar tu experiencia es necesario'),
  category: Yup.string().required('La categoria es requerida'),
  CLABE: Yup.string()
    .required('la CLABE es Requerida')
    .test('CLABE', 'La CLABE no es valida', (val) => {
      return clabe.validate(val).ok;
    })
});

export default function BecomeWorker() {
  const navigate = useNavigate();
  const [bank, setBank] = useState('');
  const [status, setStatus] = useState('');
  const { userData } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  if (
    isProtectedDashboardRoute.includes(location.pathname) &&
    userData.type === 'worker'
  ) {
    return <Navigate to='/dashboard' replace />;
  }

  async function onSubmit(data) {
    const userData = {
      type: 'worker',
      expertise: data.expYears,
      category: data.category,
      CLABE: data.CLABE
    };
    patchUser({ 'Content-Type': 'application/json' }, userData)
      .then((res) => {
        setStatus(res.message);
        navigate('/dashboard', { replace: true });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setStatus(err.message);
      });
  }

  return (
    <div className='flex flex-col items-center w-full my-10'>
      <h3 className='text-2xl text-center font-oswald'>
        Convertete en <span className='font-bold'>Worker</span> para obtener
        todas las ventajas
      </h3>
      <div className='flex justify-center m-5'>
        <ChangeText></ChangeText>
      </div>
      <form
        className='flex flex-col gap-3 m-5 grow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-5 mt-5'>
          <Select
            isRequired
            size='sm'
            variant='bordered'
            label='Categoria'
            errorMessage={errors.category?.message}
            isInvalid={!!errors.category}
            {...register('category')}
          >
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            size='sm'
            variant='bordered'
            label='Años de experiencia'
            errorMessage={errors.expYears?.message}
            isInvalid={!!errors.expYears}
            {...register('expYears')}
          >
            {expertise.map((exp) => (
              <SelectItem key={exp} value={exp}>
                {exp}
              </SelectItem>
            ))}
          </Select>
          <Input
            size='sm'
            variant='bordered'
            label='CLABE'
            maxLength={18}
            errorMessage={errors.CLABE?.message}
            isInvalid={!!errors.CLABE}
            description={bank}
            onValueChange={(value) => {
              if (clabe.validate(value).ok === true) {
                setBank(clabe.validate(value).bank);
              } else {
                setBank('');
              }
            }}
            {...register('CLABE')}
          />
          <div className='flex justify-between gap-3 mt-10'>
            <Button
              size='lg'
              radius='md'
              onClick={() => {
                navigate(
                  '/dashboard',
                  { relativeTo: '/dashboard' },
                  { replace: true }
                );
                location.reload();
              }}
              className='text-white bg-wkablack font-oswald hover:cursor-pointer hover:bg-zinc-400'
            >
              AUN NO
            </Button>
            <Button
              size='lg'
              radius='md'
              type='submit'
              className='text-white bg-wkablack font-oswald hover:cursor-pointer'
              startContent={<img src='/arrow-right.svg' alt='next' />}
            >
              SE UN WORKER
            </Button>
          </div>
          {status && (
            <p className='text-xl text-center text-red-400 font-roboto'>
              {status}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
