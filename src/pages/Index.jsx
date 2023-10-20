import { Image } from '@nextui-org/react';
import { useUser } from '../utils/UserContext';

export default function Index() {
  const { userData } = useUser();

  return (
    <div className='flex flex-col m-10 '>
      <h1 className='my-3 text-4xl font-bold leading-tight tracking-widest font-oswald text-neutral-800'>
        BIENVENIDO A{' '}
        <span className={`font-bold ${'bg-clip-text-image-dashboard'}`}>
          WORKEA
        </span>
      </h1>
      <section className='flex justify-center w-full my-14 lg:mt-20'>
        <div className='flex justify-center w-full max-w-xl'>
          <div className='flex items-center justify-center w-1/2 '>
            <Image
              width={200}
              alt='profile-pic'
              src={userData?.photo}
              className='rounded-full object-cover shadow-[0_5px_80px_10px_rgba(0,0,0,0.3)] shadow-secondary'
            />
          </div>
          <div className='flex flex-col self-center w-1/2 gap-5 p-4 rounded-xl'>
            <p className='text-3xl tracking-widest font-oswald'>
              {userData?.name} {userData?.lastName}
            </p>
            <p className='text-xl tracking-wide font-roboto'>
              {userData.category}
            </p>
            <p className='text-xl font-bold font-roboto'>
              {userData.type === 'worker' ? 'WORKER' : 'Usuario'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
