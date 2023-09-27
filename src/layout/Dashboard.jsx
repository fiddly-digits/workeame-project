import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import MenuItem from '../components/MenuItem';
import HeaderApp from '../components/HeaderApp';
import Footer from '../components/Footer';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  //const userData = useOutletContext();
  //const navigate = useNavigate();
  const [userData, setUserData] = useState({});

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
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const plainPayload = JSON.parse(atob(payload));
      axios
        .get(`http://localhost:8080/api/v1/user/${plainPayload.id}`)
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  console.log(userData);

  return (
    <div className='bg-fourth'>
      <HeaderApp userData={userData} />
      <div className=' bg-fourth'>
        <div className='container flex flex-col w-auto gap-2 pb-10 m-auto'>
          <article className='flex flex-row justify-between gap-10 py-4 m-2 '>
            <div className='flex flex-col max-w-lg gap-3'>
              <h2 className='text-2xl font-bold font-oswald'>
                ESTE ES EL CONTROL DE TU SITIO,{' '}
                <span className='font-bold font-oswald text-secondary'>
                  {userData.name?.toUpperCase()}
                </span>
              </h2>
              {userData.isProfileComplete ? (
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
            <div className='hidden align-middle md:flex'></div>
          </article>
          <div className='flex flex-row gap-4'>
            <aside className='hidden md:flex'>
              <Card
                shadow='sm'
                className='m-2 p-5 w-80 min-h-auto max-h-[46rem] rounded-xl'
              >
                <CardBody className='flex p-0 overflow-visible shadow-sm '>
                  <a
                    className='my-3 text-3xl font-bold tracking-wider text-center font-oswald'
                    href='/dashboard'
                  >
                    WORKEA
                  </a>
                  <h3 className='font-roboto text-center text-sm my-3 tracking-[2px] text-gray-500'>
                    General
                  </h3>
                  <ul className='flex flex-col items-center gap-3'>
                    {!userData.isProfileComplete && (
                      <MenuItem
                        icon='presentation.svg'
                        action='Completa tu perfil'
                        reference='complete'
                        position='top'
                      />
                    )}
                    {userData.type === 'user' && (
                      <MenuItem
                        icon='receipt-tax.svg'
                        action='Quiero ser Worker'
                        reference='become-worker'
                        position={!userData.isComplete ? 'top' : 'bottom'}
                      />
                    )}
                    {userData.type === 'worker' && (
                      <>
                        <MenuItem
                          icon='presentation.svg'
                          action='Configura tu Micrositio'
                          reference=''
                          position='top'
                        />
                        <MenuItem
                          icon='presentation.svg'
                          action='Configura tu Semana'
                          reference=''
                        />
                        <MenuItem
                          icon='presentation.svg'
                          action='Configura tus Servicios'
                          reference=''
                        />
                      </>
                    )}
                    <MenuItem
                      icon='check-circle-t.svg'
                      action='Busca Workers'
                      reference=''
                      isDisabled={!userData.isProfileComplete}
                      //position={!userData.type === 'worker' ? 'top' : null}
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
                      isDisabled={!userData.isProfileComplete}
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
                      isDisabled={!userData.isProfileComplete}
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
              <Outlet />
            </main>
          </div>
          {/* <PremiumButton customClassName='flex md:hidden'></PremiumButton> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
