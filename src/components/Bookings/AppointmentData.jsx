import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Button,
  Avatar,
  Select,
  SelectItem,
  Spinner
} from '@nextui-org/react';
import { ChatBubble, Check } from 'iconoir-react';
import { bookingStatusDictionary } from '../../utils/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import DayJSUtc from 'dayjs/plugin/utc';
import DayJSTimezone from 'dayjs/plugin/timezone';
import { useState } from 'react';
import { updateBookingStatus } from '../../utils/fetch';
import clsx from 'clsx';

dayjs.locale('es');
dayjs.extend(DayJSUtc);
dayjs.extend(DayJSTimezone);

export default function AppointmentData({ booking, type }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectionError, setSelectionError] = useState('');
  const [responseStatus, setResponseStatus] = useState('');

  const workerStatusColors = clsx('text-gray-500', {
    'text-green-500': booking.workerStatus === 'confirmed',
    'text-red-500': booking.workerStatus === 'cancelled',
    'bg-primary-500': booking.workerStatus === 'completed'
  });

  const clientStatusColors = clsx('text-gray-500', {
    'text-green-500': booking.clientStatus === 'confirmed',
    'text-red-500': booking.clientStatus === 'cancelled',
    'bg-primary-500': booking.clientStatus === 'completed'
  });

  function onSubmit() {
    console.log('submit');
    console.log(selectedStatus);
    if (selectedStatus === '') {
      setSelectionError('Para actualizar, selecciona un status');
      return;
    }
    if (
      selectedStatus === 'completed' &&
      type === 'provider' &&
      booking.workerStatus !== 'confirmed'
    ) {
      setSelectionError(
        'No puedes completar una cita que no ha sido confirmada'
      );
      return;
    }

    if (
      selectedStatus === 'completed' &&
      type === 'customer' &&
      booking.clientStatus !== 'confirmed'
    ) {
      setSelectionError(
        'No puedes completar una cita que no ha sido confirmada'
      );
      return;
    }

    const data = {
      status: selectedStatus
    };

    updateBookingStatus(booking._id, data)
      .then((res) => {
        setResponseStatus(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        setResponseStatus(err.data.message);
      });
  }

  if (!booking) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spinner color='secondary' label='Cargando...' size='lg' />
      </div>
    );
  }

  return (
    <Card fullWidth>
      <CardHeader className='justify-between font-oswald'>
        <div className='flex items-center gap-3'>
          {type === 'provider' ? (
            <>
              <Avatar showFallback src={booking.customer.photo} />
              <p>Solicitud de Cita de {booking.customer.name}</p>
            </>
          ) : (
            <>
              <Avatar src={booking.provider.photo} />
              <p>Cita con {booking.provider.name}</p>
            </>
          )}
        </div>
        <Button
          size='sm'
          className='text-white bg-wkablack font-oswald hover:cursor-pointer'
        >
          <ChatBubble />
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className='gap-3 font-roboto'>
        <div className='flex flex-col gap-5 md:flex-row'>
          <div>
            <p>{booking.name}</p>
            <p>
              Inicio:{' '}
              {dayjs(booking.start).format('D MMMM YYYY [a las] HH:mm [horas]')}
            </p>
            <p>
              Fin:{' '}
              {dayjs(booking.end).format('D MMMM YYYY [a las] HH:mm [horas]')}
            </p>
            <p>
              {type === 'provider' ? 'Status Cliente' : 'Status Worker'}:{' '}
              <span
                className={
                  type === 'provider' ? clientStatusColors : workerStatusColors
                }
              >
                {type === 'provider'
                  ? bookingStatusDictionary[booking.clientStatus]
                  : bookingStatusDictionary[booking.workerStatus]}
              </span>
            </p>
            <p>
              Tu Status:{' '}
              <span
                className={
                  type === 'provider' ? workerStatusColors : clientStatusColors
                }
              >
                {type === 'provider'
                  ? bookingStatusDictionary[booking.workerStatus]
                  : bookingStatusDictionary[booking.clientStatus]}
              </span>
            </p>
          </div>
          {/* <div className='flex items-center justify-center grow'>
            <Button>Deja un mensaje</Button>
          </div> */}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className='gap-3 font-roboto'>
        {booking.workerStatus === 'cancelled' ||
        booking.clientStatus === 'cancelled' ? (
          <p className='self-center text-center text-red-500 font-roboto'>
            Esta cita ha sido cancelada
          </p>
        ) : (
          <div className='flex flex-col items-center gap-3 grow'>
            <p>Actualiza el Status</p>
            <div className='flex flex-col items-center justify-center w-full gap-3 grow md:flex-row'>
              <Select
                variant='bordered'
                size='sm'
                label='Status'
                errorMessage={selectionError}
                isInvalid={!!selectionError}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setSelectionError('');
                }}
              >
                {Object.keys(bookingStatusDictionary)
                  .filter((key) => {
                    if (type === 'provider') {
                      return key !== 'pending' && key !== booking.workerStatus;
                    } else if (type === 'customer') {
                      return key !== 'pending' && key !== booking.clientStatus;
                    } else {
                      return key !== 'Pending';
                    }
                  })
                  .map((key) => (
                    <SelectItem value={key} key={key}>
                      {bookingStatusDictionary[key]}
                    </SelectItem>
                  ))}
              </Select>
              <Button
                type='button'
                onPress={onSubmit}
                size='lg'
                className='text-white bg-wkablack font-oswald hover:cursor-pointer'
              >
                <Check />
              </Button>
            </div>
            {responseStatus && (
              <p className='self-center text-center text-red-500 font-roboto'>
                {responseStatus}
              </p>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
