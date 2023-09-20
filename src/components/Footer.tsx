export default function Footer() {
  return (
    <footer className='relative z-10 flex flex-col gap-3 p-24 overflow-hidden lg:block bg-fourth'>
      <div className='flex flex-col gap-3 font-roboto'>
        <p className='text-lg'>
          Calle 345 10. Del. Azcapotzalco 56672. Ciudad de México, México
        </p>
        <div className='flex flex-col gap-4 text-lg lg:flex-row'>
          <p>+525532423221</p>
          <span className='hidden lg:block'>|</span>
          <p>contacto@workea.me</p>
        </div>
        <h3 className='text-xl font-bold'>Navegacion</h3>
        <div className='flex flex-col gap-4 text-lg lg:flex-row'>
          <a href='/'>Quienes Somos</a>
          <span className='hidden lg:block'>|</span>
          <a href='/'>Como Funciona</a>
          <a className='hidden lg:block'>|</a>
          <a href='/'>Porque Nosotros</a>
          <span className='hidden lg:block'>|</span>
          <a href='/'>Busca tu Worker</a>
        </div>
        <h3 className='text-xl font-bold'>Recursos</h3>
        <div className='flex flex-col gap-4 text-lg lg:flex-row'>
          <a href='/'>Contactanos</a>
          <span className='hidden lg:block'>|</span>
          <a href='/'>Beneficios</a>
        </div>
      </div>
      <div className='flex flex-col gap-3 lg:items-end lg:justify-between font-roboto lg:flex-row text-secondary'>
        <p className='text-sm lg:text-md lg:order-1'>
          © 2023 Team Workea.me. All Rights Reserved
        </p>
        <div className='flex items-center order-last lg:order-2'>
          <img src='/linked.svg' alt='linked' className='w-10 h-10' />
          <img src='/facebook.svg' alt='facebook' className='w-10 h-10' />
          <img src='/twitterx.svg' alt='twitterx' className='w-10 h-10' />
        </div>
        <p className='text-sm lg:text-md lg:order-3'>
          Consulta nuestra{' '}
          <span className='underline'>Política de Privacidad</span> y{' '}
          <span className='underline'>Términos del Servicio</span>
        </p>
      </div>
      <div className='absolute'>
        <h1 className='hidden relative text-[380px] bottom-96 -z-10 md:hidden text-center font-oswald font-bold leading-none text-white lg:block'>
          Workea
        </h1>
      </div>
    </footer>
  );
}
