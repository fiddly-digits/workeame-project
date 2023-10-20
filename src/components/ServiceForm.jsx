import { Input, Textarea, Checkbox, Button } from '@nextui-org/react';
import { Lock, NoLock, Restart, SaveFloppyDisk, Trash } from 'iconoir-react';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createService, deleteService, patchService } from '../utils/fetch';
import ModalOnCall from './ModalOnCall';
import ModalForDecisions from './ModalForDecisions';

const schema = Yup.object().shape({
  name: Yup.string()
    .notOneOf([''], 'El nombre del servicio es requerido')
    .min(5, 'El nombre debe tener al menos 5 caracteres')
    .max(50, 'El nombre debe tener máximo 50 caracteres'),
  description: Yup.string()
    .notOneOf([''], 'La descripción del servicio es requerida')
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(500, 'La descripción debe tener máximo 500 caracteres'),
  price: Yup.number()
    .typeError('El precio no debe estar vacío')
    .min(10, 'El precio debe ser mayor a 10')
});

export default function ServiceForm({ element, setService, index }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [name, setName] = useState(element.name || '');
  const [description, setDescription] = useState(element.description || '');
  const [price, setPrice] = useState(element.price || '');
  const [isPaymentPerHour, setIsPaymentPerHour] = useState(
    element.isPaymentPerHour || false
  );
  const [unlock, setUnlock] = useState(true);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [shouldOpenDecisionsModal, setShouldOpenDecisionsModal] =
    useState(false);
  const [status, setStatus] = useState({});
  const isElementEmpty = Object.keys(element).length === 0;

  useEffect(() => {
    isElementEmpty ? setUnlock(false) : setUnlock(true);
  }, [isElementEmpty]);

  const onSubmit = (data) => {
    const dataToSubmit = {
      ...(data.name != element.name && { name: data.name }),
      ...(data.description != element.description && {
        description: data.description
      }),
      ...(data.price != element.price && { price: data.price }),
      ...(data.isPaymentPerHour != element.isPaymentPerHour && {
        isPaymentPerHour: data.isPaymentPerHour
      })
    };

    if (Object.keys(dataToSubmit).length === 0) {
      setStatus({ success: false, message: 'No has hecho ningún cambio' });
      setShouldOpenModal(true);
      return;
    }

    if (isElementEmpty) {
      createService(dataToSubmit)
        .then((res) => {
          console.log(res.data);
          setStatus(res.data);
          setService((prev) => {
            const newServices = [...prev];
            newServices[index] = res.data.data;
            return newServices;
          });
          setShouldOpenModal(true);
        })
        .catch((err) => {
          console.log(err);
          setStatus(err.response.data);
          setShouldOpenModal(true);
        });
    } else {
      patchService(element._id, dataToSubmit)
        .then((res) => {
          console.log(res.data);
          setStatus(res.data);
          setService((prev) => {
            const newServices = [...prev];
            newServices[index] = res.data.data;
            return newServices;
          });
          setShouldOpenModal(true);
        })
        .catch((err) => {
          console.log(err);
          setStatus(err.response.data);
          setShouldOpenModal(true);
        });
    }

    console.log('Data to Submit', dataToSubmit);

    //console.log(data);
  };

  const onDelete = () => {
    deleteService(element._id)
      .then((res) => {
        setStatus(res.data);
        setShouldOpenModal(true);
      })
      .catch((err) => {
        console.log(err);
        setStatus(err.response.data);
        setShouldOpenModal(true);
      });
  };

  return (
    <form className='flex justify-center gap-10'>
      <fieldset className='flex flex-col gap-3'>
        <Input
          type='text'
          size='sm'
          className='font-roboto'
          value={name}
          isReadOnly={unlock}
          variant='bordered'
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label='Nombre del Servicio'
          {...register('name', {
            onChange: (e) => setName(e.target.value)
          })}
        />
        <Textarea
          label='Descripción'
          variant='bordered'
          value={description}
          isReadOnly={unlock}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          type='text'
          className='w-full max-w-xl font-roboto'
          {...register('description', {
            onChange: (e) => setDescription(e.target.value)
          })}
        />
        <div className='flex items-center w-full max-w-xl gap-3'>
          <Input
            size='sm'
            label='Precio'
            isReadOnly={unlock}
            value={price ? price : ''}
            variant='bordered'
            errorMessage={errors.price?.message}
            isInvalid={!!errors.price}
            placeholder='0.00'
            type='number'
            {...register('price', {
              onChange: (e) => setPrice(e.target.value)
            })}
            startContent={
              <div className='flex items-center pointer-events-none'>
                <span className='text-default-400 text-small'>$</span>
              </div>
            }
          />
          <Controller
            name={'isPaymentPerHour'}
            control={control}
            defaultValue={isPaymentPerHour ? isPaymentPerHour : false}
            render={({ field }) => (
              <Checkbox
                color='secondary'
                isSelected={field.value}
                isReadOnly={unlock}
                {...field}
                onChange={(event) => field.onChange(event.target.checked)}
              >
                <span className='text-sm text-gray-400 font-roboto whitespace-nowrap'>
                  Por hora
                </span>
              </Checkbox>
            )}
          />
        </div>
      </fieldset>
      <div className='flex flex-col justify-around'>
        {Object.keys(element).length !== 0 && (
          <Button
            type='button'
            radius='sm'
            className='px-8 text-white bg-wkablack font-oswald hover:bg-zinc-700'
            onPress={() => setUnlock(!unlock)}
          >
            {unlock ? (
              <>
                <NoLock /> Desbloquear
              </>
            ) : (
              <>
                <Lock /> Bloquear
              </>
            )}
          </Button>
        )}
        <Button
          type='button'
          radius='sm'
          className='px-8 text-white bg-wkablack font-oswald hover:bg-zinc-700'
          onPress={() => {
            reset({
              name: element.name || '',
              description: element.description || '',
              price: element.price || '',
              isPaymentPerHour: element.isPaymentPerHour || false
            });
            setName(element.name || '');
            setDescription(element.description || '');
            setPrice(element.price || '');
            setIsPaymentPerHour(element.isPaymentPerHour || false);
          }}
        >
          <Restart />
          {Object.keys(element).length === 0 ? 'Limpiar' : 'Restaurar'}
        </Button>
        {Object.keys(element) != 0 && (
          <Button
            type='button'
            radius='sm'
            className='px-8 text-white bg-wkablack font-oswald hover:bg-zinc-700'
            onPress={async () => {
              setShouldOpenDecisionsModal(true);
            }}
          >
            <Trash /> Eliminar
          </Button>
        )}
        <Button
          type='button'
          radius='sm'
          className='px-8 text-white bg-wkablack font-oswald hover:bg-zinc-700'
          onPress={handleSubmit(onSubmit)}
        >
          <SaveFloppyDisk />
          {Object.keys(element).length === 0 ? 'Guardar' : 'Modificar'}
        </Button>
      </div>
      {shouldOpenModal && (
        <ModalOnCall
          status={status}
          shouldOpenModal={shouldOpenModal}
          setShouldOpenModal={setShouldOpenModal}
        />
      )}

      {shouldOpenDecisionsModal && (
        <ModalForDecisions
          shouldOpenDecisionsModal={shouldOpenDecisionsModal}
          setShouldOpenDecisionsModal={setShouldOpenDecisionsModal}
          onDelete={onDelete}
        />
      )}
    </form>
  );
}
