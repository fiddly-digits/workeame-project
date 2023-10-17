import { Image } from '@nextui-org/react';
import { useUser } from '../utils/UserContext';

export default function Index() {
  const { userData } = useUser();

  console.log('UserData', userData);

  return (
    <div className='flex flex-col m-10'>
      <h2 className='w-full mb-8 text-2xl text-black font-oswald'>
        Bienvenido a Workea
      </h2>
      <div className='flex border'>
        <div className='flex items-center justify-center w-1/2'>
          <Image
            alt='profile-pic'
            src={userData?.photo}
            className='object-contain w-48 h-48 rounded-full '
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <p className='text-xl font-roboto'>
            {userData?.name} {userData?.lastName}
          </p>
          <p className='text-xl font-roboto'>{userData.category}</p>
          <p className='text-xl font-roboto'>
            {userData.type === 'worker' ? 'Worker' : 'Usuario'}
          </p>
        </div>
      </div>
    </div>
  );
}
