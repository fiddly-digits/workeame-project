import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from '@nextui-org/react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      className='bg-primary'
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

