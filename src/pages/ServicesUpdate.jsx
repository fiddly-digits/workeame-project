import { Button, Spinner } from '@nextui-org/react';
import { useState, useEffect, Fragment } from 'react';
import { fetchServices } from '../utils/fetch';
import ServiceForm from '../components/ServiceForm';

export default function ServiceUpdate() {
  const [service, setService] = useState(null);
  const [initialServices, setInitialServices] = useState([]);

  const addService = () => {
    setService([...service, {}]);
  };

  const deleteService = (index) => {
    console.log('INDEX', index);
    const newServices = [...service];
    newServices.splice(index, 1);
    setService(newServices);
  };

  useEffect(() => {
    console.log(service);
  }, [service]);

  useEffect(() => {
    fetchServices('GET', { accept: 'application/json' })
      .then((res) => {
        setService(res);
        setInitialServices(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('initialServices', initialServices);
  console.log(service);

  if (!service) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spinner color='secondary' label='Cargando...' size='lg' />
      </div>
    );
  }

  return (
    <div className='flex flex-col m-10'>
      <h2 className='w-full mb-8 text-2xl text-slate-500 font-oswald'>
        Configura tus Servicios
      </h2>
      <div className='inline-flex flex-col gap-5'>
        {service.map((element, index) => {
          return (
            <Fragment key={`service-${index}`}>
              <p className='text-xl font-bold text-center font-roboto'>
                {Object.keys(element) != 0 ? 'Modifica' : 'Agrega'} tu Servicio
              </p>

              <ServiceForm
                element={element}
                setService={setService}
                index={index}
              />
            </Fragment>
          );
        })}
      </div>
      <div className='flex justify-center gap-3 p-10'>
        {service.length < 3 && (
          <Button
            radius='sm'
            className='w-auto px-8 text-black bg-transparent border border-black font-oswald hover:bg-wkablack hover:text-white'
            onClick={addService}
          >
            Agregar Nuevo Servicio
          </Button>
        )}
        {initialServices.length != service.length && (
          <Button
            radius='sm'
            className='w-auto px-8 text-black bg-transparent border border-black font-oswald hover:bg-wkablack hover:text-white'
            onPress={() => deleteService(service.length - 1)}
          >
            Eliminar Servicio
          </Button>
        )}
      </div>
    </div>
  );
}