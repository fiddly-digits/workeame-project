import { useEffect, useState } from 'react';
import { fetchBookings } from '../utils/fetch';
import { Button, ButtonGroup } from '@nextui-org/react';
import AppointmentData from '../components/Bookings/AppointmentData';

export default function Bookings() {
  const [providerBookings, setProviderBookings] = useState([]);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [isProviderDisabled, setIsProviderDisabled] = useState(true);
  const [isCustomerDisabled, setIsCustomerDisabled] = useState(false);

  useEffect(() => {
    fetchBookings('provider')
      .then((res) => {
        setProviderBookings(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchBookings('customer')
      .then((res) => {
        setCustomerBookings(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('provider', providerBookings);
  console.log('customer', customerBookings);

  return (
    <div className='flex flex-col items-center justify-center gap-10 m-10'>
      <h2 className='w-full mb-8 text-2xl text-black font-oswald'>
        Valida tus Citas
      </h2>
      <ButtonGroup
        variant='bordered'
        className='font-oswald'
        size='lg'
        color='secondary'
      >
        <Button
          isDisabled={isProviderDisabled}
          onPress={() => {
            setIsProviderDisabled(true);
            setIsCustomerDisabled(false);
          }}
        >
          Proveedor
        </Button>
        <Button
          isDisabled={isCustomerDisabled}
          onPress={() => {
            setIsCustomerDisabled(true);
            setIsProviderDisabled(false);
          }}
        >
          Cliente
        </Button>
      </ButtonGroup>

      {isProviderDisabled && (
        <div className='flex justify-center w-1/2'>
          {providerBookings.length !== 0 ? (
            providerBookings.map((booking) => {
              return (
                <AppointmentData
                  key={booking._id}
                  booking={booking}
                  type='provider'
                />
              );
            })
          ) : (
            <p className='text-center'>No tienes citas como proveedor</p>
          )}
        </div>
      )}
      {isCustomerDisabled && (
        <div className='flex justify-center w-1/2'>
          {customerBookings.length != 0 ? (
            customerBookings.map((booking) => {
              return (
                <AppointmentData
                  key={booking._id}
                  booking={booking}
                  type='customer'
                />
              );
            })
          ) : (
            <p className='text-center'>No tienes citas como cliente</p>
          )}
        </div>
      )}
    </div>
  );
}
