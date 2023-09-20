import { useEffect, useState } from 'react';
import DualButton from './DualButton';
import { stack as Menu } from 'react-burger-menu';
import clsx from 'clsx';

export default function Header() {
  const [header, setHeader] = useState('primary');

  const changeBackground = () => {
    if (window.scrollY >= 6300) {
      setHeader('white');
    } else if (window.scrollY >= 4900) {
      setHeader('purple');
    } else if (window.scrollY >= 3200) {
      setHeader('orange');
    } else {
      setHeader('primary');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
  }, []);

  return (
    <header
      className={clsx(
        `flex grow items-center h-20 justify-between px-5 font-roboto font-oswald sticky top-0 z-50 lg:justify-evenly lg:px-24`,
        {
          'bg-primary': header === 'primary'
        },
        {
          'bg-third': header === 'orange'
        },
        {
          'bg-secondary': header === 'purple'
        },
        { 'bg-fourth': header === 'white' }
      )}
    >
      <img src='./workea.svg' alt='workea-logo' className='w-12 h-7' />
      <nav className='items-center hidden gap-5 lg:flex'>
        <h2 className='line font-oswald'>QUIENES SOMOS</h2>
        <h2 className='line font-oswald'>COMO FUNCIONA</h2>
        <h2 className='line font-oswald'>PORQUE NOSOTROS</h2>
      </nav>
      <DualButton className='hidden lg:flex' />
      <nav className='relative flex w-8 h-8 lg:hidden'>
        <Menu right>
          <h2 className='font-oswald'>QUIENES SOMOS</h2>
          <h2 className='font-oswald'>COMO FUNCIONA</h2>
          <h2 className='font-oswald'>PORQUE NOSOTROS</h2>
        </Menu>
      </nav>
    </header>
  );
}
