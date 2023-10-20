import { Input, Textarea, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
}

export default function DescriptionOfService({ name }: Props) {
  return (
    <>
      <section className='p-5'>
        <p className='font-roboto text-md md:text-lg'>
          <span className='font-bold capitalize'>{name}</span> quiere saber un
          poco sobre qué servicio necesitas.
        </p>
        <form>
          <div className='flex flex-col gap-5 my-10'>
            <Input
              className='font-roboto'
              type='text'
              label='Tipo de servicio'
              size='sm'
              isClearable
              isRequired
              variant='bordered'
            ></Input>
            <Textarea
              isRequired
              className='font-roboto'
              variant='bordered'
              label='En este espacio puedes especificar el servicio que necesitas.'
            ></Textarea>
          </div>
          <div className='flex flex-row justify-between md:justify-evenly'>
            <Link to={''}>
              <img
                src='/chat-alt.svg'
                alt='chat'
                className='w-10 h-10 transition-all duration-100 md:h-12 md:w-12 hover:font-bold hover:animate-appearance-in'
              />
            </Link>
            <Button
              radius='md'
              type='submit'
              className='w-40 text-white bg-wkablack font-oswald hover:cursor-pointer'
            >
              AGENDAR
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
