import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import MenuItem from '../components/MenuItem';

export default function Dashboard() {
  const userData = useOutletContext();
  //const navigate = useNavigate();
  const [user, setUser] = useState({});

  // const isLogged = () => {
  //   if (userData) {
  //     setUser(userData);
  //   } else {
  //     setUser({});
  //   }
  // };

  //   if (!userData) {
  //     console.log(userData);
  //     navigate('/');
  //   }
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <div className=' bg-fourth'>
      <div className='container flex flex-col w-auto gap-2 m-auto'>
        <article className='flex flex-row justify-between gap-10 py-4 m-2 '>
          <div className='flex flex-col max-w-lg gap-3'>
            <h2 className='text-2xl font-bold font-oswald'>
              ESTE ES EL CONTROL DE TU SITIO,{' '}
              <span className='font-bold font-oswald text-secondary'>
                {user.name?.toUpperCase()}
              </span>
            </h2>
            {user.isComplete ? (
              <p className='text-sm text-justify font-roboto'>
                Aquí darás seguimiento a todos los movimientos que se realicen
                en tu cuenta, así como el estatus en el que se encuentre.
              </p>
            ) : (
              <p className='text-sm text-justify font-roboto'>
                {' '}
                Completa tu perfil para comenzar a usar la plataforma
              </p>
            )}
          </div>
          <div className='hidden align-middle md:flex'>
            {/* <PremiumButton></PremiumButton> */}
          </div>
        </article>
        <div className='flex flex-row gap-4'>
          <Menu />
          <aside className='hidden md:flex'>
            <Card
              shadow='sm'
              className='m-2 p-5 w-80 min-h-auto max-h-[46rem] rounded-xl'
            >
              <CardBody className='flex p-0 overflow-visible shadow-sm '>
                <h1 className='my-3 text-3xl font-bold tracking-wider text-center font-oswald'>
                  WORKEA
                </h1>
                <h3 className='font-roboto text-center text-sm my-3 tracking-[2px] text-gray-500'>
                  General
                </h3>
                <ul className='flex flex-col items-center gap-3'>
                  <MenuItem
                    icon='presentation.svg'
                    action='Completa tu perfil'
                    reference='dashboard/complete'
                    position='top'
                  />
                  <MenuItem
                    icon='receipt-tax.svg'
                    action='Quiero ser Worker'
                    reference=''
                  />
                  <MenuItem
                    icon='check-circle-t.svg'
                    action='Busca Workers'
                    reference=''
                    isDisabled={!user.isComplete}
                  />
                  <MenuItem
                    icon='chat-alt.svg'
                    action='Chats'
                    isDisabled={true}
                  />
                  <MenuItem
                    icon='check-circle-t.svg'
                    action='Mis citas'
                    reference=''
                    isDisabled={!user.isComplete}
                    position={'bottom'}
                  />
                </ul>
                <h3 className='font-roboto text-sm text-center my-3 tracking-[2px] text-gray-500'>
                  Cuenta
                </h3>
                <ul className='flex flex-col items-center gap-3'>
                  <MenuItem
                    icon='calendar.svg'
                    action='Datos de la cuenta'
                    reference=''
                    isDisabled={!user.isComplete}
                    position={'top'}
                    onPress={() => console.log('hola')}
                  />
                  <MenuItem
                    icon='cog.svg'
                    action='Salir'
                    reference=''
                    position='bottom'
                  />
                </ul>
              </CardBody>
            </Card>
          </aside>
          <main className='w-full min-h-unit-24 bg-white rounded-xl m-2 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.1)] border  border-gray-300'>
            <h1>HOLA AQUI DEBERIA APARECER EL OUTLET</h1>
            <Outlet />
            {/* <FirstInfo></FirstInfo> */}
            {/* <Offers></Offers> */}
            {/* <Appointments></Appointments> */}
            {/* <Chats></Chats> */}
            {/* <Calendar></Calendar> */}
            {/* <Settings></Settings> */}
            {/* <AccountData></AccountData> */}
            {/* <Notifications></Notifications> */}
          </main>
        </div>
        {/* <PremiumButton customClassName='flex md:hidden'></PremiumButton> */}
      </div>
    </div>
  );
}
