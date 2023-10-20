import { useEffect, useState } from 'react';
import { fetchBookings } from '../utils/fetch';
import { Button, ButtonGroup } from '@nextui-org/react';
import AppointmentData from '../components/Bookings/AppointmentData';
import dayjs from 'dayjs';

export default function Bookings() {
  const [providerBookings, setProviderBookings] = useState([]);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [isProviderDisabled, setIsProviderDisabled] = useState(true);
  const [isCustomerDisabled, setIsCustomerDisabled] = useState(false);

  //TODO:HANDLE ERRORS

  useEffect(() => {
    fetchBookings('provider')
      .then((res) => {
        setProviderBookings(res);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchBookings('customer')
      .then((res) => {
        setCustomerBookings(res);
      })
      .catch(() => {});
  }, []);

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
        <div className='flex flex-col items-center w-1/2 gap-3'>
          {providerBookings.length !== 0 ? (
            providerBookings.map((booking) => {
              if (dayjs(booking.start).add(1, 'day').isAfter(dayjs())) {
                return (
                  <>
                    <AppointmentData
                      key={booking._id}
                      booking={booking}
                      type='provider'
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <AppointmentData
                      key={booking._id}
                      booking={booking}
                      type='provider'
                      isOverdue
                    />
                  </>
                );
              }
            })
          ) : (
            <p className='text-center'>No tienes citas como proveedor</p>
          )}
        </div>
      )}
      {isCustomerDisabled && (
        <div className='flex flex-col items-center w-1/2 gap-3'>
          {customerBookings.length != 0 ? (
            customerBookings.map((booking) => {
              if (dayjs(booking.start).add(1, 'day').isAfter(dayjs())) {
                return (
                  <>
                    <AppointmentData
                      key={booking._id}
                      booking={booking}
                      type='customer'
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <AppointmentData
                      key={booking._id}
                      booking={booking}
                      type='customer'
                      isOverdue
                    />
                  </>
                );
              }
            })
          ) : (
            <p className='text-center font-roboto'>
              No tienes citas como cliente
            </p>
          )}
        </div>
      )}
    </div>
  );
}
