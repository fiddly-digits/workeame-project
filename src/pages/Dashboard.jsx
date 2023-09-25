import Menu from '../components/Menu';

export default function Dashboard() {
  return (
    <div className=' bg-fourth'>
      <div className='container flex flex-col w-auto gap-2 m-auto'>
        <article className='flex flex-row justify-between gap-10 py-4 m-2 '>
          <div className='flex flex-col max-w-lg gap-3'>
            <h2 className='text-2xl font-bold font-oswald'>
              ESTE ES EL CONTROL DE TU SITIO
            </h2>
            <p className='text-sm text-justify font-roboto'>
              Aquí darás seguimiento a todos los movimientos que se realicen en
              tu cuenta, así como el estatus en el que se encuentre.
            </p>
          </div>
          <div className='hidden align-middle md:flex'>
            {/* <PremiumButton></PremiumButton> */}
          </div>
        </article>
        <div className='flex flex-row gap-4'>
          <aside className='hidden md:flex'>
            <Menu></Menu>
          </aside>
          <main className='w-full min-h-unit-24 bg-white rounded-xl m-2 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.1)] border  border-gray-300'>
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
