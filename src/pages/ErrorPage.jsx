import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderApp from '../components/HeaderApp';

export default function ErrorPage() {
  return (
    <>
      <div>
        <HeaderApp></HeaderApp>
        <section className='container flex flex-col self-center justify-center h-screen gap-5 m-auto'>
          <div className='flex flex-row items-center justify-center gap-5 md:gap-10'>
            <h1 className='font-oswald font-bold text-[11rem] md:text-[20rem]'>
              4
            </h1>
            <div>
              <img
                src='/pictures/gif_John Travolta.gif'
                alt='confused'
                className='h-[11rem] md:h-[20rem] w-auto rounded-full shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)]'
              />
            </div>
            <h1 className='font-oswald font-bold text-[11rem] md:text-[20rem]'>
              4
            </h1>
          </div>
          <div className='flex justify-center tracking-widest'>
            <p className='text-4xl md:text-[3rem] font-oswald font-bold text-center'>
              Oops!{' '}
              <span className='font-light text-zinc-500'>
                Parece que algo falló.
              </span>{' '}
            </p>
          </div>
          <div className='flex justify-center my-20'>
            <Link
              to={'/'}
              className='flex text-2xl font-bold font-oswald md:text-4xl dark:text-secondary animate-pulse '
            >
              <img src='/arrow-left.svg' alt='arrow' className='h-auto px-4' />
              Regresa al Inicio
            </Link>
          </div>
        </section>
        <Footer letters='relative -right-[14rem]'></Footer>
      </div>
    </>
  );
}
