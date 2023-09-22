import DualButton from './DualButton';

export default function HeaderApp() {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between h-20 px-5 bg-fourth grow lg:justify-evenly lg:px-24'>
      <h1 className='text-5xl font-bold w-fit h-fit font-oswald'>
        W<span className='lg:hidden'>ORKEA</span>
      </h1>
      <nav className='items-center hidden gap-5 lg:flex'></nav>
      <DualButton />
    </header>
  );
}
