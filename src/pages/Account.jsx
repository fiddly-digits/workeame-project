import {
  Image,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react';
import { EditPencil, Edit } from 'iconoir-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { fetchUser } from '../utils/fetch';

// TODO: Add validation to the different fields
// TODO: FIX THIS

const schema = Yup.object().shape({
  name: Yup.lazy((value) =>
    !value
      ? Yup.string()
      : Yup.string()
          .max(20, 'El nombre debe tener menos de 20 caracteres')
          .min(3, 'El nombre debe tener al menos 3 caracteres')
  ),
  lastName: Yup.lazy((value) =>
    !value
      ? Yup.string()
      : Yup.string()
          .max(20, 'El nombre debe tener menos de 20 caracteres')
          .min(3, 'El nombre debe tener al menos 3 caracteres')
  ),
  photo: Yup.mixed(),
  street: Yup.string(),
  locality: Yup.string(),
  state: Yup.string(),
  municipality: Yup.string(),
  postCode: Yup.lazy((value) =>
    !value
      ? Yup.string()
      : Yup.string()
          .nullable()
          .matches(/^[0-9]+$/, 'Solo se aceptan numeros')
          .test(
            'len',
            'El Numero Postal debe de tener 5 numeros',
            (val) => val.length === 5
          )
  ),
  phone: Yup.lazy((value) =>
    !value
      ? Yup.string()
      : Yup.string()
          .nullable()
          .matches(/^[0-9]+$/, 'Solo se aceptan numeros')
          .test(
            'len',
            'El Telefono debe de tener 10 numeros',
            (val) => val.length === 10
          )
  )
});

export default function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [editable, setEditable] = useState({ editable: {} });
  const [userData, setUserData] = useState({});
  const [selectedImage, setSelectedImage] = useState();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetchUser('GET', { accept: 'application/json' })
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onEdit = (id) => {
    setEditable({ ...editable, [id]: !editable[id] });
  };

  const onSubmit = (data) => {
    console.log(data);
    const userInfo = {
      ...(data.name && { name: data.name }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.phone && { phone: `+52${data.phone}` }),
      address: {
        ...(data.street && { street: data.street }),
        ...(data.locality && { locality: data.locality }),
        ...(data.state && { state: data.state }),
        ...(data.municipality && { municipality: data.municipality }),
        ...(data.postCode && { postCode: data.postCode })
      },
      ...(data.category && { category: data.category }),
      ...(data.expertise && { expertise: data.expertise }),
      ...(selectedImage && { photo: selectedImage[0] })
    };
    if (Object.keys(userInfo).length === 0 && userInfo.address) {
      return;
    }
    if (Object.keys(userInfo.address).length === 0) {
      delete userInfo['address'];
    }
    const token = sessionStorage.getItem('token');
    axios
      .patch('http://localhost:8080/api/v1/user/update/', userInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        //console.log('Aqui tendria que redirigirte', response);
        setSuccess(response.data.success);
        setMessage(response.data.message);
      })
      .catch((error) => {
        setSuccess(error.response.data.success);
        setMessage(error.response.data.message);
      });
  };

  async function onChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files;
      setSelectedImage(imageFile);
      setStatus(true);
    }
  }

  return (
    <div className='flex flex-col m-10'>
      <h2 className='w-full mb-8 text-2xl text-slate-500 font-oswald'>
        Modifica tu perfil
      </h2>
      <form
        className='flex justify-around grow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col items-center justify-center gap-10'>
          <Image
            width={200}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage[0])
                : userData.photo
            }
            alt='user-profile'
            isZoomed
            radius='full'
          />
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
          {selectedImage && (
            <>
              <p className=' font-roboto text-slate-500'>
                Esta sera tu nueva foto de perfil
              </p>
              <Button
                type='reset'
                size='lg'
                radius='md'
                className='text-white bg-wkablack font-oswald hover:cursor-pointer'
                onPress={() => {
                  setSelectedImage(null);
                  setStatus(false);
                }}
              >
                ELIMINAR
              </Button>
            </>
          )}
        </div>
        <div className='flex flex-col gap-3'>
          <h5 className='font-oswald'>Datos Personales</h5>
          <div className='flex gap-3'>
            <Input
              size='sm'
              {...(editable.name
                ? { isReadOnly: false }
                : { isReadOnly: true })}
              type='text'
              label='Nombre'
              variant='bordered'
              placeholder={userData.name}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              onValueChange={(value) => {
                if (value) {
                  setStatus(true);
                } else {
                  setStatus(false);
                }
              }}
              className='max-w-xs'
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={onEdit.bind(this, 'name')}
                >
                  {editable.name ? <Edit /> : <EditPencil />}
                </button>
              }
              {...register('name')}
            />
            <Input
              size='sm'
              type='text'
              {...(editable.lastName
                ? { isReadOnly: false }
                : { isReadOnly: true })}
              label='Apellido'
              variant='bordered'
              placeholder={userData?.lastName}
              errorMessage={errors.lastName?.message}
              isInvalid={!!errors.lastName}
              onValueChange={(value) => {
                if (value) {
                  setStatus(true);
                } else {
                  setStatus(false);
                }
              }}
              className='max-w-xs'
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={onEdit.bind(this, 'lastName')}
                >
                  {editable.lastName ? <Edit /> : <EditPencil />}
                </button>
              }
              {...register('lastName')}
            />
          </div>
          <Input
            size='sm'
            type='text'
            {...(editable.phone ? { isReadOnly: false } : { isReadOnly: true })}
            label='Teléfono'
            variant='bordered'
            placeholder={userData.phone && userData.phone.slice(3)}
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
            onValueChange={(value) => {
              if (value) {
                setStatus(true);
              } else {
                setStatus(false);
              }
            }}
            className='max-w-xs'
            startContent={
              <div>
                <span className='text-default-400 text-small'>+52</span>
              </div>
            }
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={onEdit.bind(this, 'phone')}
              >
                {editable.phone ? <Edit /> : <EditPencil />}
              </button>
            }
            {...register('phone')}
          />

          <div className='flex flex-col gap-3'>
            <h4 className='text-slate-500 font-oswald'>Dirección</h4>
            <Input
              type='text'
              size='sm'
              {...(editable.street
                ? { isReadOnly: false }
                : { isReadOnly: true })}
              variant='bordered'
              label='Calle y Numero'
              placeholder={userData.address?.street}
              errorMessage={errors.street?.message}
              isInvalid={!!errors.street}
              onValueChange={(value) => {
                if (value) {
                  setStatus(true);
                } else {
                  setStatus(false);
                }
              }}
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={onEdit.bind(this, 'street')}
                >
                  {editable.street ? <Edit /> : <EditPencil />}
                </button>
              }
              {...register('street')}
            />
            <Input
              type='text'
              size='sm'
              {...(editable.locality
                ? { isReadOnly: false }
                : { isReadOnly: true })}
              variant='bordered'
              label='Colonia'
              placeholder={userData.address?.locality}
              errorMessage={errors.locality?.message}
              isInvalid={!!errors.locality}
              onValueChange={(value) => {
                if (value) {
                  setStatus(true);
                } else {
                  setStatus(false);
                }
              }}
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={onEdit.bind(this, 'locality')}
                >
                  {editable.locality ? <Edit /> : <EditPencil />}
                </button>
              }
              {...register('locality')}
            />
            <Input
              type='text'
              size='sm'
              {...(editable.state
                ? { isReadOnly: false }
                : { isReadOnly: true })}
              variant='bordered'
              label='Estado'
              placeholder={userData.address?.state}
              errorMessage={errors.state?.message}
              isInvalid={!!errors.state}
              onValueChange={(value) => {
                if (value) {
                  setStatus(true);
                } else {
                  setStatus(false);
                }
              }}
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={onEdit.bind(this, 'state')}
                >
                  {editable.state ? <Edit /> : <EditPencil />}
                </button>
              }
              {...register('state')}
            />
            <Input
              type='text'
              size='sm'
              {...(editable.municipality
                ? { isReadOnly: false }
                : { isReadOnly: true })}
              variant='bordered'
              label='Acaldia / Municipio'
              placeholder={userData.address?.municipality}
              errorMessage={errors.municipality?.message}
              isInvalid={!!errors.municipality}
              onValueChange={(value) => {
                if (value) {
                  setStatus(true);
                } else {
                  setStatus(false);
                }
              }}
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={onEdit.bind(this, 'municipality')}
                >
                  {editable.municipality ? <Edit /> : <EditPencil />}
                </button>
              }
              {...register('municipality')}
            />
            <div className='flex gap-3'>
              <Input
                type='string'
                size='sm'
                {...(editable.postCode
                  ? { isReadOnly: false }
                  : { isReadOnly: true })}
                variant='bordered'
                label='Código Postal'
                placeholder={userData.address?.postCode}
                errorMessage={errors.postCode?.message}
                isInvalid={!!errors.postCode}
                onValueChange={(value) => {
                  if (value) {
                    setStatus(true);
                  } else {
                    setStatus(false);
                  }
                }}
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={onEdit.bind(this, 'postCode')}
                  >
                    {editable.postCode ? <Edit /> : <EditPencil />}
                  </button>
                }
                {...register('postCode')}
              />
              <Input
                type='text'
                variant='bordered'
                label='País'
                size='sm'
                isReadOnly
                isDisabled
                defaultValue='México'
              />
            </div>
            {userData.type === 'worker' && (
              <div className='flex flex-col gap-3'>
                <h4 className='text-slate-500 font-oswald'>
                  Información del Worker
                </h4>
                <Input
                  type='text'
                  size='sm'
                  {...(editable.category
                    ? { isReadOnly: false }
                    : { isReadOnly: true })}
                  variant='bordered'
                  label='Categoria'
                  placeholder={userData.category}
                  errorMessage={errors.category?.message}
                  isInvalid={!!errors.category}
                  onValueChange={(value) => {
                    if (value) {
                      setStatus(true);
                    } else {
                      setStatus(false);
                    }
                  }}
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={onEdit.bind(this, 'category')}
                    >
                      {editable.category ? <Edit /> : <EditPencil />}
                    </button>
                  }
                  {...register('category')}
                />
                <Input
                  type='text'
                  size='sm'
                  {...(editable.expertise
                    ? { isReadOnly: false }
                    : { isReadOnly: true })}
                  variant='bordered'
                  label='Años de experiencia'
                  placeholder={userData.expertise}
                  errorMessage={errors.expertise?.message}
                  isInvalid={!!errors.expertise}
                  onValueChange={(value) => {
                    if (value) {
                      setStatus(true);
                    } else {
                      setStatus(false);
                    }
                  }}
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={onEdit.bind(this, 'expertise')}
                    >
                      {editable.expertise ? <Edit /> : <EditPencil />}
                    </button>
                  }
                  {...register('expertise')}
                />
              </div>
            )}
            <Button
              size='lg'
              radius='md'
              type='submit'
              {...(status ? { isDisabled: false } : { isDisabled: true })}
              className='text-white bg-wkablack font-oswald hover:cursor-pointer'
              startContent={<img src='/arrow-right.svg' alt='next' />}
              onPress={onOpen}
            >
              ACTUALIZA
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              hideCloseButton
            >
              <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>
                  {success ? 'Successful Update' : 'Error'}
                </ModalHeader>
                <ModalBody>
                  <p>{message}</p>
                </ModalBody>
                <ModalFooter>
                  <Link
                    to={{
                      pathname: '/dashboard'
                    }}
                    reloadDocument
                    color='danger'
                  >
                    Finish
                  </Link>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </form>
    </div>
  );
}

{
  /* <Input
size='sm'
type='email'
{...(editable.email ? { isReadOnly: false } : { isReadOnly: true })}
label='Email'
variant='bordered'
defaultValue={userInfo.email}
description='Si actualizas tu correo, deberás volver a verificarlo'
className='max-w-xs'
endContent={
  <button
    className='focus:outline-none'
    type='button'
    onClick={onEdit.bind(this, 'email')}
  >
    {editable.email ? <Edit /> : <EditPencil />}
  </button>
}
{...register('email')}
/> */
}
