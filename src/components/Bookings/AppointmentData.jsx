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
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent
} from '@nextui-org/react';
import { Check, Paypal } from 'iconoir-react';
import { bookingStatusDictionary } from '../../utils/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import DayJSUtc from 'dayjs/plugin/utc';
import DayJSTimezone from 'dayjs/plugin/timezone';
import { useState } from 'react';
import { bookingPaymentUpdate, updateBookingStatus } from '../../utils/fetch';
import clsx from 'clsx';
import { clabe } from 'clabe-validator';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

dayjs.locale('es');
dayjs.extend(DayJSUtc);
dayjs.extend(DayJSTimezone);

export default function AppointmentData({ booking, type, isOverdue }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectionError, setSelectionError] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const initialOptions = {
    clientId: 'test',
    currency: 'MXN',
    intent: 'capture'
  };
  const workerStatusColors = clsx('text-gray-500', {
    'text-green-500': booking.workerStatus === 'confirmed',
    'text-red-500': booking.workerStatus === 'cancelled',
    'text-secondary-500': booking.workerStatus === 'completed'
  });

  const clientStatusColors = clsx('text-gray-500', {
    'text-green-500': booking.clientStatus === 'confirmed',
    'text-red-500': booking.clientStatus === 'cancelled',
    'text-secondary-500': booking.clientStatus === 'completed'
  });

  const shadowColors = clsx('shadow-md', {
    'shadow-green-400': !isOverdue,
    'shadow-red-400':
      isOverdue ||
      booking.clientStatus === 'cancelled' ||
      booking.workerStatus === 'cancelled'
    //'shadow-secondary-400': booking.clientStatus === 'completed'
  });

  function onSubmit() {
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
        setResponseStatus(err.response.data.message);
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
    <Card fullWidth className={shadowColors}>
      <CardHeader className='justify-between font-oswald'>
        <div className='flex items-center gap-3'>
          {type === 'provider' ? (
            <>
              <Avatar showFallback src={booking.customer?.photo} />
              <p>Solicitud de Cita de {booking.customer?.name}</p>
            </>
          ) : (
            <>
              <Avatar showFallback src={booking.provider.photo} />
              <p>Cita con {booking.provider.name}</p>
            </>
          )}
        </div>
        {isOverdue === true ||
        booking.clientStatus === 'cancelled' ||
        booking.workerStatus === 'cancelled' ? (
          <p className='text-gray-500'>
            {booking.clientStatus === 'cancelled' ||
            booking.workerStatus === 'cancelled'
              ? 'Cita Cancelada'
              : 'Cita Vencida'}
          </p>
        ) : (
          <p className='text-gray-500'>Cita Activa</p>
        )}
      </CardHeader>
      <Divider />
      <CardBody className='gap-3 font-roboto'>
        <div className='flex flex-col gap-5 md:flex-row'>
          <div>
            <p>{booking.name}</p>
            <p>
              {' '}
              Precio total del servicio: $
              {booking.service.price * booking.timeslot.length} MXN
            </p>
            <p>
              Inicio:{' '}
              {dayjs(booking.start).format('D MMMM YYYY [a las] HH:mm [horas]')}
            </p>
            <p>
              Fin:{' '}
              {dayjs(booking.end).format('D MMMM YYYY [a las] HH:mm [horas]')}
            </p>
            {type === 'customer' && (
              <>
                <p>CLABE: {booking.provider.CLABE} </p>
                <p>Banco: {clabe.validate(booking.provider.CLABE).bank}</p>
              </>
            )}

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
            {booking.isPaypalPaymentCompleted?.status === 'COMPLETED' && (
              <p>El pago de esta cita ya fue completado</p>
            )}
            {type === 'customer' &&
              booking.workerStatus === 'confirmed' &&
              booking.clientStatus === 'confirmed' &&
              booking.isPaypalPaymentCompleted?.status != 'COMPLETED' && (
                <>
                  <Button
                    type='button'
                    className='text-white bg-wkablack font-oswald'
                    onPress={() => setShowPaymentModal(true)}
                  >
                    Pago Con Paypal <Paypal />
                  </Button>
                  {showPaymentModal && (
                    <PaymentModal
                      showModal={showPaymentModal}
                      setShowModal={setShowPaymentModal}
                      initialOptions={initialOptions}
                      service={booking.service}
                      providerName={booking.provider.name}
                      priceMultiplier={booking.timeslot.length}
                      bookingID={booking._id}
                    />
                  )}
                </>
              )}
          </div>
          {/* <div className='flex items-center justify-center grow'>
            <Button>Deja un mensaje</Button>
          </div> */}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className='gap-3 font-roboto'>
        {isOverdue === true ? (
          <p className='self-center text-center text-red-500 font-roboto'>
            La cita esta vencida
          </p>
        ) : booking.workerStatus === 'cancelled' ||
          booking.clientStatus === 'cancelled' ||
          booking.clientStatus === 'completed' ||
          booking.workerStatus === 'completed' ? (
          <p className='self-center text-center text-red-500 font-roboto'>
            Esta cita ha sido{' '}
            {(type === 'provider' && booking.workerStatus === 'cancelled') ||
            (type === 'customer' && booking.clientStatus === 'cancelled') ? (
              <span>cancelada</span>
            ) : (
              <span className='text-green-500'>completada</span>
            )}
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

function PaymentModal({
  showModal,
  setShowModal,
  initialOptions,
  service,
  providerName,
  priceMultiplier,
  bookingID
}) {
  function onSubmit(order) {
    const data = {
      status: order.status,
      order: order.id,
      payedAmount: service.price * priceMultiplier
    };

    bookingPaymentUpdate(bookingID, data)
      .then((res) => {
        console.log('res', res);
        window.location.reload();
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  return (
    <Modal
      isOpen={showModal}
      onOpenChange={setShowModal}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col gap-1'>
            Pago de Tu Cita
          </ModalHeader>
          <ModalBody>
            <div>
              <h1 className='font-roboto'>
                Paga tu cita con {providerName} via Paypal
              </h1>
            </div>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: `Pago de cita de ${service.name}`,
                        amount: {
                          value: service.price * priceMultiplier
                        }
                      }
                    ],
                    application_context: {
                      shipping_preference: 'NO_SHIPPING'
                    }
                  });
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture();
                  onSubmit(order);
                }}
              />
            </PayPalScriptProvider>
          </ModalBody>
          <ModalFooter>
            <Button
              className='text-white bg-wkablack font-oswald'
              onPress={() => setShowModal(false)}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
