import {
  Select,
  SelectItem,
  Button,
  RadioGroup,
  Radio,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react';
import { SelectorIcon } from './SelectorIcon';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import DayJSUtc from 'dayjs/plugin/utc';
import DayJSTimezone from 'dayjs/plugin/timezone';
import { getNumbersInRange } from '../../utils/utils';
import { createBooking } from '../../utils/fetch';

dayjs.locale('es');
dayjs.extend(DayJSUtc);
dayjs.extend(DayJSTimezone);

export default function DateAndTime({ schedule, services }) {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedEndHour, setSelectedEndHour] = useState(null);
  const [dayEndHours, setDayEndHours] = useState(null);
  const [dayAvailableHours, setDayAvailableHours] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onSubmit() {
    if (selectedService === null) {
      setErrorMessage('Debes de seleccionar un servicio');
      return;
    }
    if (selectedDate === null) {
      setErrorMessage('Debes de seleccionar una fecha');
      return;
    }
    if (selectedHour === null || selectedEndHour === null) {
      setErrorMessage('Debes de seleccionar un rango de horas');
      return;
    }

    setBookingStatus(null);

    console.log(selectedService);

    const data = {
      date: selectedDate,
      start: dayjs(selectedDate).hour(selectedHour).minute(0).toISOString(),
      end: dayjs(selectedDate).hour(selectedEndHour).minute(0).toISOString()
    };

    console.log(data);

    createBooking(data, selectedService)
      .then((res) => {
        console.log(res);
        setBookingStatus('Cita agendada con éxito');
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setBookingStatus(err.response.data.message);
        setIsModalOpen(true);
      });

    console.log('selected hour', selectedHour);
    console.log('selected end hour', selectedEndHour);
    console.log('selected Service', selectedService);
    console.log('selected Date', selectedDate);

    console.log(
      'count numbers in range',
      getNumbersInRange(selectedHour, selectedEndHour)
    );
  }

  return (
    <>
      <section className='p-5'>
        <form action='' className='flex flex-col gap-4'>
          <p className='font-semibold font-roboto text-md md:text-lg '>
            Elige el servicio de tu interés.
          </p>
          <Select
            label='Selecciona tu Servicio'
            variant='bordered'
            size='sm'
            className='max-w-xs'
            onSelectionChange={(value) => {
              setSelectedService(value.currentKey);
            }}
            onChange={(event) => {
              if (event.target.value === '') {
                setSelectedService(null);
                setSelectedDate(null);
                setSelectedHour(null);
                setSelectedEndHour(null);
                setDayAvailableHours(null);
                setDayEndHours(null);
                return;
              }
              setSelectedService(event.target.value);
            }}
          >
            {services.map((service) => (
              <SelectItem key={service._id} value={service}>
                {service.name}
              </SelectItem>
            ))}
          </Select>
          {selectedService && (
            <>
              <div className='flex flex-row justify-between'>
                <p className='font-semibold font-roboto text-md md:text-lg '>
                  Elige el dia de tu interés.
                </p>
              </div>
              <div className='w-auto max-w-1/2 font-roboto'>
                <RadioGroup
                  label='Selecciona el dia para tu cita'
                  onChange={(event) => {
                    const day = schedule.find(
                      (day) => day._id === event.target.value
                    );
                    console.log(day);
                    setSelectedDate(day.date);
                    setSelectedHour(null);
                    setDayAvailableHours(day.activeHours);
                  }}
                >
                  {schedule.map((day) => {
                    if (
                      day.availability &&
                      dayjs(day.date).isAfter(dayjs(), 'day')
                    ) {
                      return (
                        <Radio value={day._id}>
                          {dayjs(day.date).format(
                            'dddd, D [de] MMMM [de] YYYY'
                          )}
                        </Radio>
                      );
                    }
                  })}
                </RadioGroup>
              </div>
            </>
          )}
          <div className='flex gap-3'>
            {dayAvailableHours && (
              <Select
                variant='bordered'
                label='Horario de inicio'
                placeholder='Selecciona horario disponible'
                labelPlacement='outside'
                className='max-w-xs font-roboto'
                onOpenChange={(open) => {
                  if (open) {
                    setSelectedEndHour(null);
                    setDayEndHours(null);
                  }
                }}
                onChange={(event) => {
                  if (event.target.value === '') {
                    setSelectedHour(null);
                    setSelectedEndHour(null);
                    setDayEndHours(null);
                    setSelectedEndHour(null);
                    return;
                  }
                  setDayEndHours(
                    dayAvailableHours.filter(
                      (hour) => hour >= event.target.value
                    )
                  );
                  setSelectedHour(event.target.value);
                  setSelectedEndHour(null);
                }}
                disableSelectorIconRotation
                selectorIcon={<SelectorIcon />}
              >
                {dayAvailableHours
                  .sort((a, b) => a - b)
                  .map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {`${hour.toString().padStart(2, '0')}:00`}
                    </SelectItem>
                  ))}
              </Select>
            )}
            {dayEndHours && (
              <Select
                variant='bordered'
                label='Horario de termino'
                placeholder='Selecciona horario disponible'
                labelPlacement='outside'
                className='max-w-xs font-roboto'
                onChange={(event) => {
                  if (event.target.value === '') {
                    setSelectedEndHour(null);
                    return;
                  }
                  setSelectedEndHour(event.target.value);
                }}
                disableSelectorIconRotation
                selectorIcon={<SelectorIcon />}
              >
                {dayEndHours.map((hour) => {
                  return (
                    <SelectItem key={hour + 1} value={hour + 1}>
                      {`${(hour + 1).toString().padStart(2, '0')}:00`}
                    </SelectItem>
                  );
                })}
              </Select>
            )}
          </div>
          {errorMessage && (
            <p className='text-center text-red-500 font-roboto'>
              {errorMessage}
            </p>
          )}
          <div className='flex flex-row justify-around mt-3'>
            <Button
              radius='md'
              className='w-40 text-white bg-wkablack font-oswald hover:cursor-pointer'
              onPress={onSubmit}
            >
              AGENDAR
            </Button>
          </div>
          {isModalOpen && bookingStatus && (
            <DateAndTimeModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              bookingStatus={bookingStatus}
            />
          )}
        </form>
      </section>
    </>
  );
}

function DateAndTimeModal({ isModalOpen, setIsModalOpen, bookingStatus }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Estatus de tu solicitud
            </ModalHeader>
            <ModalBody>
              <p className='text-red-500 font-roboto'>{bookingStatus}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                className='text-white bg-wkablack font-oswald'
                onPress={() => {
                  onClose();
                  if (bookingStatus === 'Cita agendada con éxito') {
                    window.location.reload();
                  }
                }}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
