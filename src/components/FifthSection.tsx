import Input from './Input';
import WorkerCard from './WorkerCard';
import WorkerButton from './WorkerButton';

export default function FifthSection() {
  return (
    <section className='flex justify-center bg-fourth'>
      <article className='container relative flex flex-col items-center h-auto min-h-screen p-10 py-24 justify-evenly bg-fourth'>
        <h1 className='text-5xl subpixel-antialiased font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800'>
          BUSCA TU WORKER
        </h1>
        <form action='' className='flex flex-wrap justify-center gap-5'>
          <Input
            type={'text'}
            placeholder='Que clase de worker buscas'
            icon='search-icon'
          />
          <Input type={'text'} placeholder='Localidad' icon='map-icon' />
        </form>
        <div className='flex flex-col lg:flex-row'>
          <WorkerCard
            name='Elmer Figueroa'
            job='Bailarin'
            picture='/pictures/chayanne.webp'
          />
          <WorkerCard
            name='Elmer Figueroa'
            job='Bailarin'
            picture='/pictures/chayanne.webp'
          />
          <WorkerCard
            name='Elmer Figueroa'
            job='Bailarin'
            picture='/pictures/chayanne.webp'
          />
        </div>
        <WorkerButton action='CONVIERTETE EN WORKER' />
      </article>
    </section>
  );
}
