/* interface Props {
  nextTitle?: string;
  reference: string;
  button?: boolean;
}

export default function BottomButtons({ nextTitle, reference, button }: Props) {
  return (
    <div className='flex flex-wrap self-start gap-5 py-12 lg:order-last lg:px-28'>
      <a
        href={`#${reference}-section`}


 */

interface Props {
  bg?: string;
  letters?: string;
  text?: string;
}

export default function Footer({ bg, letters, text }: Props) {
  return (
    <footer
      className={`relative z-10 flex flex-col gap-3 p-5 overflow-hidden lg:block bg-fourth ${bg}`}
    >
      <div className='flex flex-col gap-3 font-roboto'>
        <p className='text-md lg:text-lg'>
          Calle 345 10. Del. Azcapotzalco 56672. Ciudad de México, México
        </p>
        <div className='flex flex-row gap-4 text-md lg:text-lg'>
          <p>+525532423221</p>
          <span className=''>|</span>
          <p className='hover:text-secondary hover:font-bold '>
            contacto@workea.me
          </p>
        </div>
        <h3 className='text-xl tracking-[0.5rem] font-bold'>Navegacion</h3>
        <div className='flex flex-col gap-4 text-md lg:text-lg lg:flex-row '>
          <a
            href='#second-section'
            className='hover:text-secondary hover:font-bold'
          >
            Quienes Somos
          </a>
          <span className='hidden lg:block'>|</span>
          <a
            href='#third-section'
            className='hover:text-secondary hover:font-bold'
          >
            Como Funciona
          </a>
          <a className='hidden lg:block'>|</a>
          <a
            href='#fourth-section'
            className='hover:text-secondary hover:font-bold'
          >
            Porque Nosotros
          </a>
          <span className='hidden lg:block'>|</span>
          <a
            href='#fifth-section'
            className='hover:text-secondary hover:font-bold'
          >
            Busca tu Worker
          </a>
        </div>
        <h3 className='text-xl font-bold tracking-[0.5rem] '>Recursos</h3>
        <div className='flex flex-row gap-4 text-md lg:text-lg'>
          <a href='/'>Contactanos</a>
          <span>|</span>
          <a href='/'>Beneficios</a>
        </div>
      </div>
      <div
        className={`flex flex-col items-center mt-10 gap-3 lg:items-end lg:justify-between font-roboto lg:flex-row text-secondary ${text}`}
      >
        <p className='text-sm lg:text-md lg:order-1'>
          © 2023 Team Workea.me. All Rights Reserved
        </p>
        <div className='flex items-center order-last lg:order-2 lg:hidden'>
          <img src='/linked.svg' alt='linked' className='w-10 h-10' />
          <img src='/facebook.svg' alt='facebook' className='w-10 h-10' />
          <img src='/twitterx.svg' alt='twitterx' className='w-10 h-10' />
        </div>
        <p className='text-sm text-center lg:text-md lg:order-3'>
          Consulta nuestra{' '}
          <span className='underline'>Política de Privacidad</span> y{' '}
          <span className='underline'>Términos del Servicio</span>
        </p>
      </div>
      <div className='relative'>
        <h1 className='absolute bottom-8 -left-48 md:-left-[26rem] lg:-left-5 lg:bottom-0  text-[35rem] lg:text-[23rem] -z-10 text-center font-oswald font-bold leading-none text-white '>
          <span className={`md:hidden ${letters}`}>W</span>
          <span className={`hidden md:block lg:tracking-wider ${letters}`}>
            Workea
          </span>
        </h1>
      </div>
    </footer>
  );
}
