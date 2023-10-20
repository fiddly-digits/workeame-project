import HeaderApp from '../components/HeaderApp';
import Footer from '../components/Footer';
import WorkerCardFlip from '../components/WorkerCardFlip';
import { Button } from '@nextui-org/react';

let workerCard = [
  {
    key: 3,
    name: 'Karen Segovia',
    picture: '/pictures/mujer1.jpg',
    job: 'Florista',
    address: 'Col. Roma , CDMX',
    description:
      'Hola, soy Karen y estoy aquí para brindarte servicios de floristeria profesional.',
    position: 't'
  }
];

export default function RegisteredProfile() {
  return (
    <>
      <div className='bg-fourth'>
        <HeaderApp></HeaderApp>
        <main className='flex flex-col w-auto h-full py-10 m-auto md:px-10'>
          <div className='flex flex-row justify-center gap-2 '>
            <img
              src='/check-circle.svg'
              alt='check-circle'
              className='w-16'
            ></img>
            <h2 className='flex justify-center m-5 text-2xl font-oswald'>
              ¡Tu perfil está registrado!
            </h2>
          </div>
          <div className='flex justify-center'>
            {workerCard.map((card) => (
              <WorkerCardFlip
                key={card.key}
                name={card.name}
                job={card.job}
                picture={card.picture}
                address={card.adress}
                description={card.description}
                position={card.position}
              ></WorkerCardFlip>
            ))}
          </div>
          <div className='flex justify-center'>
            <Button
              radius='sm'
              className='px-8 text-white bg-black font-oswald hover:bg-zinc-700 w-60'
            >
              <img src='/arrow-right.svg' alt='arrow' className='w-6 h-6' />
              Siguiente
            </Button>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
