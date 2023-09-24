import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderApp({ userData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Validar si la userdata esta correcta
  return (
    <Navbar
      className='bg-transparent'
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
              <DropdownItem
                key='logout'
                color='danger'
                textValue='logout'
                className='font-semibold font-oswald'
                onClick={() => {
                  sessionStorage.removeItem('token');
                  navigate('/login');
                  location.reload();
                }}
              >
                SALIR
              </DropdownItem>
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
    </Navbar>
  );
}
