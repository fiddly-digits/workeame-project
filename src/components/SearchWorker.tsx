import WorkerCardFlip from './WorkerCardFlip';
import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { fetchWorkersData } from '../utils/fetch';
import { Link } from 'react-router-dom';
import { shuffleArray } from '../utils/utils';

//Aleatorizar Workers Cards

export default function SearchWorker() {
  const [fetchedSites, setFetchedSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkersData()
      .then((res) => {
        const shuffledArray = shuffleArray(res);
        setFetchedSites(shuffledArray);
        setLoading(false);
      })
      .catch((err) => {
        //TODO: HANDLE ERROR
        if (err) setLoading(false);
      });
  }, []);

  return (
    <>
      <div className=' bg-fourth'>
        <div className='container flex flex-col justify-center w-auto gap-2 m-auto '>
          <h1 className='my-3 mt-10 text-5xl font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800'>
            BUSCA TU{' '}
            <span className={`text-5xl font-bold ${'bg-clip-text-image'}`}>
              WORKER
            </span>
          </h1>
          <div className='grid grid-cols-1 my-10 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
            {loading && (
              <Spinner
                color='secondary'
                label='Cargando...'
                size='lg'
                className='grid-cols-3'
              />
            )}
            {fetchedSites.slice(0, 3).map((site) => (
              <WorkerCardFlip
                key={site._id}
                name={`${site.owner.name} ${site.owner.lastName}`}
                job={site.owner.category}
                picture={site.owner.photo}
                address={site.owner.address.state}
                description={site.about}
                position={'t'}
                route={site.micrositeURL}
              />
            ))}
          </div>
          <div className='flex justify-center w-auto mt-5 mb-20'>
            <Link
              to={'/search'}
              className='flex items-center h-16 gap-2 px-5 text-lg font-bold text-center transition-colors duration-700 ease-in bg-white rounded-md shadow-md font-oswald border-hidden hover:bg-gray-950 hover:text-white'
            >
              BUSCA TU WORKER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
