import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  DropdownSection
} from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function HeaderApp({ color }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    Cookies.remove('userData');
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <Navbar
      className={`bg-${color}`}
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link
            className='text-4xl font-bold text-wkablack w-fit h-fit font-oswald'
            href='/'
          >
            W<span className='lg:hidden'>orkea</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {location.pathname === '/' && (
        <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
          <NavbarItem>
            <Link
              color='foreground'
              href='#second-section'
              className=' line font-oswald'
            >
              QUIENES SOMOS
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href='#third-section'
              color='foreground'
              className='line font-oswald'
            >
              COMO FUNCIONA
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color='foreground'
              href='#fourth-section'
              className='line font-oswald'
            >
              PORQUE NOSOTROS
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
      {userData ? (
        <NavbarContent as='div' justify='end'>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                isBordered
                showFallback
                as='button'
                className='transition-transform'
                color='secondary'
                size='sm'
                src={userData.photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem
                key='profile'
                className='gap-2 h-14'
                textValue='profile'
              >
                <p className='font-semibold font-roboto'>Bienvenido(a)</p>
                <p className='font-semibold font-roboto'>{`${userData.name} ${userData.lastName}`}</p>
              </DropdownItem>
              <DropdownSection title='General'>
                <DropdownItem
                  key='dashboard'
                  color='secondary'
                  title='Dashboard'
                  className='font-semibold font-oswald'
                  onClick={() => navigate('/dashboard')}
                />
                {!userData?.isProfileComplete && (
                  <DropdownItem
                    key='complete'
                    color='secondary'
                    title='Completa tu Perfil'
                    className='font-semibold font-oswald'
                    onClick={() => navigate('/dashboard/complete')}
                  />
                )}
                {userData.type === 'user' && userData.isProfileComplete && (
                  <DropdownItem
                    key='become-worker'
                    color='secondary'
                    title='Quiero ser Worker'
                    className='font-semibold font-oswald'
                    onClick={() => navigate('/dashboard/become-worker')}
                  />
                )}

                {userData?.isMicrositeCreated && (
                  <DropdownItem
                    key='microsite-visit'
                    color='secondary'
                    title='Visita tu Sitio'
                    className='font-semibold font-oswald'
                    onClick={() => navigate(`/ms/${userData._id}`)}
                  />
                )}
                {!userData?.isMicrositeCreated &&
                  userData.type === 'worker' && (
                    <DropdownItem
                      key='microsite-config'
                      color='secondary'
                      title='Configura tu Sitio'
                      className='font-semibold font-oswald'
                      onClick={() => navigate('/dashboard/microsite-config')}
                    />
                  )}

                {userData?.type === 'worker' && (
                  <DropdownItem
                    key='microsite-update'
                    color='secondary'
                    title='Modifica tu Sitio'
                    className='font-semibold font-oswald'
                    onClick={() => navigate('/dashboard/microsite-update')}
                  />
                )}

                {userData?.isMicrositeCreated && (
                  <DropdownItem
                    key='config-service'
                    color='secondary'
                    title='Configura tu Servicio'
                    onClick={() => navigate('/dashboard/service-update')}
                    className='font-semibold font-oswald'
                  />
                )}
                {userData?.isMicrositeCreated && (
                  <DropdownItem
                    key='schedule-update'
                    color='secondary'
                    title='Configura tu Agenda'
                    onClick={() => navigate('/dashboard/schedule-update')}
                    className='font-semibold font-oswald'
                  />
                )}
                <DropdownItem
                  key='busca-workers'
                  color='secondary'
                  title='Busca Workers'
                  className='font-semibold font-oswald'
                  onClick={() => navigate('/search')}
                />

                <DropdownItem
                  key='bookings'
                  color='secondary'
                  title='Tus Citas'
                  className='font-semibold font-oswald'
                  onClick={() => navigate('/dashboard/bookings')}
                />
              </DropdownSection>
              <DropdownSection title='Cuenta'>
                {userData?.isProfileComplete && (
                  <DropdownItem
                    key='modify-profile'
                    color='secondary'
                    title='Modifica tu Perfil'
                    className='font-semibold font-oswald'
                    onClick={() => navigate('/dashboard/account')}
                  />
                )}
                <DropdownItem
                  key='modify-email'
                  color='secondary'
                  title='Modifica tu Correo'
                  className='font-semibold font-oswald'
                  onClick={() => navigate('/dashboard/mail')}
                />
                <DropdownItem
                  key='modify-password'
                  color='secondary'
                  title='Modifica tu Password'
                  className='font-semibold font-oswald'
                  onClick={() => navigate('/dashboard/password')}
                />
                <DropdownItem
                  key='logout'
                  color='danger'
                  title='Salir'
                  className='font-semibold font-oswald'
                  onClick={handleLogout}
                />
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Button
              as={Link}
              className='bg-transparent text-wkablack font-oswald'
              href='/login'
              variant='solid'
            >
              INGRESA
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className='font-bold border-wkablack text-wkablack font-oswald hover:bg-wkablack hover:text-white'
              href='/register'
              variant='bordered'
            >
              REGISTRATE
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color='foreground' href='#' className=' line font-oswald'>
            QUIENES SOMOS
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href='#' color='foreground' className='line font-oswald'>
            COMO FUNCIONA
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color='foreground' href='#' className='line font-oswald'>
            PORQUE NOSOTROS
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
