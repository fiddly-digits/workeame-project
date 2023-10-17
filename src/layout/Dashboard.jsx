import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import MenuItem from '../components/MenuItem';
import HeaderApp from '../components/HeaderApp';
import Footer from '../components/Footer';
import { fetchUser } from '../utils/fetch';
import dayjs from 'dayjs';
import { useUser } from '../utils/UserContext';
import Cookies from 'js-cookie';
//import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  //const userData = useOutletContext();
  //const navigate = useNavigate();
  const { userData, setUserData } = useUser();
  //const [userData, setUserData] = useState({});
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

  // const fetchData = async () => {
  //   const token = sessionStorage.getItem('token');
  //   if (token) {
  //     const payload = token.split('.')[1];
  //     const plainPayload = JSON.parse(atob(payload));
  //     var options = {
  //       method: 'GET',
  //       url: `http://localhost:8080/api/v1/user/${plainPayload.id}`,
  //       headers: { accept: 'application/json' }
  //     };
  //     let data = await axios.request(options);
  //     setUserData(data.data.data);
  //   }
  // };

  useEffect(() => {
    fetchUser({ accept: 'application/json' })
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUserData]);

  const token = sessionStorage.getItem('token');
  const payload = token.split('.')[1];
  const plainPayload = JSON.parse(atob(payload));

  const tokenExpiration = dayjs.unix(plainPayload.exp);
  const now = dayjs();
  console.log(dayjs.unix(plainPayload.exp).format('DD/MM/YYYY  HH:mm:ss'));

  console.log(tokenExpiration.isBefore(now));
  console.log(now);
  if (tokenExpiration.isBefore(now)) {
    sessionStorage.removeItem('token');
    Cookies.remove('userData');
    window.location.href = '/';
    window.location.reload();
  }

  if (!userData) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spinner color='secondary' label='Cargando...' size='lg' />
      </div>
    );
  }

  return (
    <div className='bg-fourth'>
      <HeaderApp userData={userData} />
      <div className=' bg-fourth'>
        <div className='container flex flex-col w-auto gap-2 pb-10 m-auto'>
          <article className='flex flex-row justify-between gap-10 py-4 m-2 '>
            <div className='flex flex-col gap-3 md:max-w-lg'>
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
            <aside className='hidden lg:flex'>
              <Card
                shadow='sm'
                className='m-2 p-5 w-80 min-h-auto max-h-[52rem] rounded-xl'
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
                        icon='/presentation.svg'
                        action='Completa tu perfil'
                        reference='complete'
                        position='top'
                      />
                    )}
                    {userData.type === 'user' && (
                      <MenuItem
                        icon='/receipt-tax.svg'
                        action='Quiero ser Worker'
                        reference='become-worker'
                        position={!userData.isComplete ? 'top' : 'bottom'}
                      />
                    )}
                    {userData.type === 'worker' && (
                      <>
                        {!userData.isMicrositeCreated ? (
                          <MenuItem
                            icon='/presentation.svg'
                            action='Configura tu Sitio'
                            reference='microsite-config'
                            position='top'
                          />
                        ) : (
                          <>
                            <MenuItem
                              icon='/presentation.svg'
                              action='Visita tu Sitio'
                              reference={`/ms/${userData._id}`}
                              position='top'
                            />
                            <MenuItem
                              icon='/presentation.svg'
                              action='Modifica tu Sitio'
                              reference='microsite-update'
                            />
                          </>
                        )}
                        <MenuItem
                          icon='/presentation.svg'
                          action='Configura tu Servicio'
                          reference='service-update'
                        />
                        <MenuItem
                          icon='/presentation.svg'
                          action='Configura tu Agenda'
                          reference='schedule-update'
                        />
                      </>
                    )}
                    <MenuItem
                      icon='/check-circle-t.svg'
                      action='Busca Workers'
                      reference=''
                    />
                    {/* <MenuItem
                      icon='/chat-alt.svg'
                      action='Chats'
                      isDisabled={true}
                    /> */}
                    <MenuItem
                      icon='/check-circle-t.svg'
                      action='Tus citas'
                      reference='bookings'
                      position={'bottom'}
                    />
                  </ul>
                  <h3 className='font-roboto text-sm text-center my-3 tracking-[2px] text-gray-500'>
                    Cuenta
                  </h3>
                  <ul className='flex flex-col items-center gap-3'>
                    {userData.isProfileComplete && (
                      <MenuItem
                        icon='/calendar.svg'
                        action='Modifica tu perfil'
                        reference='account'
                        position={'top'}
                      />
                    )}
                    <MenuItem
                      icon='/calendar.svg'
                      action='Cambia tu correo'
                      reference='mail'
                      position={!userData.isProfileComplete && 'top'}
                    />
                    <MenuItem
                      icon='/calendar.svg'
                      action='Cambia tu password'
                      reference='password'
                    />
                    <MenuItem
                      icon='/cog.svg'
                      action='Salir'
                      reference='/login'
                      position='bottom'
                      onClick={() => {
                        sessionStorage.removeItem('token');
                        Cookies.remove('userData');
                        window.location.reload();
                      }}
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

//export default withAuth(Dashboard);
