import Footer from '../components/Footer';
import HeaderApp from '../components/HeaderApp';
import { Button, Select, SelectItem, Spinner } from '@nextui-org/react';
import WorkerCardFlip from '../components/WorkerCardFlip';
import { states, categories } from '../utils/utils';
import { useEffect, useState } from 'react';
import { fetchWorkersData } from '../utils/fetch';

export default function SearchWorkerPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [fetchedSites, setFetchedSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchWorkersData()
      .then((res) => {
        setFetchedSites(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err) setError('Ha habido un error al cargar los datos');
        setLoading(false);
      });
  }, []);

  const onSearch = () => {
    setFetchedSites([]);
    const searchTerms = { category: selectedCategory, state: selectedState };
    setLoading(true);
    fetchWorkersData(searchTerms)
      .then((res) => {
        setFetchedSites(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err) setError('Ha habido un error al cargar los datos');
        setLoading(false);
      });
  };

  // if (loading) {
  //   return (
  //     <div className='flex flex-col items-center justify-center w-screen h-screen'>
  //       <Spinner size='large' />
  //     </div>
  //   );
  // }
  return (
    <>
      <div className=' bg-fourth'>
        <HeaderApp></HeaderApp>
        <main className='flex flex-col w-auto h-full gap-10 py-5 m-auto md:px-10'>
          <div className='container flex flex-col justify-center w-auto gap-2 m-auto '>
            <h1 className='my-3 mt-10 text-5xl font-bold leading-tight tracking-widest text-center font-oswald text-neutral-800'>
              BUSCA TU{' '}
              <span className={`text-5xl font-bold ${'bg-clip-text-image'}`}>
                WORKER
              </span>
            </h1>
            <form className='flex flex-row justify-center w-auto gap-5'>
              <Select
                label='Categoría'
                variant='bordered'
                size='sm'
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label='Localidad'
                variant='bordered'
                size='sm'
                onChange={(event) => setSelectedState(event.target.value)}
              >
                {Object.keys(states).map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </Select>
              <Button
                type='button'
                size='lg'
                className='text-white bg-wkablack font-oswald hover:cursor-pointer'
                onPress={onSearch}
              >
                Buscar
              </Button>
            </form>
            <div className='grid grid-cols-1 gap-3 my-10 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
              {loading && (
                <Spinner
                  color='secondary'
                  label='Cargando...'
                  size='lg'
                  className='grid-cols-3'
                />
              )}

              {fetchedSites &&
                fetchedSites.map((site) => {
                  if (site.owner) {
                    return (
                      <WorkerCardFlip
                        key={site._id}
                        name={`${site.owner.name} ${site.owner.lastName}`}
                        job={site.owner.category}
                        picture={site.owner.photo}
                        address={site.owner.address.state}
                        description={site.about}
                        position={'t'}
                        route={site.owner._id}
                      />
                    );
                  } else {
                    return (
                      <div className='flex justify-center col-span-3'>
                        <p className='text-center text-red-400 grow font-roboto'>
                          No se encontraron resultados para tu búsqueda, prueba
                          otra vez
                        </p>
                      </div>
                    );
                  }
                })}
              {error && (
                <p className='flex justify-center text-red-400 font-roboto'>
                  {error}
                </p>
              )}
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
