import { Button, Checkbox, ScrollShadow } from '@nextui-org/react';
import { arrayRange } from '../utils/utils';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import DayJSUtc from 'dayjs/plugin/utc';
import DayJSTimezone from 'dayjs/plugin/timezone';
import { Restart } from 'iconoir-react';
import { patchSchedule } from '../utils/fetch';
import ModalOnCall from './ModalOnCall';

// FIXME: Adapt 2 weeks from now
dayjs.locale('es');
dayjs.extend(DayJSUtc);
dayjs.extend(DayJSTimezone);

const nextDayOfWeek = (dayOfWeek) => {
  const now = dayjs();
  const day = now.day(dayOfWeek);
  return day.isBefore(now) ? day.add(1, 'week') : day;
};

export default function DaySchedule({ element, isNext }) {
  const hours = arrayRange(0, 23, 1);
  const [activeHours, setActiveHours] = useState(
    isNext ? [] : element.activeHours
  );
  const [availability, setAvailability] = useState(
    isNext ? false : element.availability
  );
  const date = element.date;
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [status, setStatus] = useState({ success: false, message: '' });

  const onSubmit = () => {
    if (availability && activeHours.length === 0) {
      setStatus({
        success: false,
        message: 'Debes seleccionar al menos una hora'
      });
      setShouldOpenModal(true);
      return;
    }

    if (
      JSON.stringify(activeHours) === JSON.stringify(element.activeHours) &&
      availability === element.availability
    ) {
      setStatus({ success: false, message: 'No has hecho ningún cambio' });
      setShouldOpenModal(true);
      return;
    }

    const dataToSubmit = {
      availability,
      activeHours,
      ...(dayjs(date).isBefore(dayjs())
        ? { date: nextDayOfWeek(dayjs(date).day()) }
        : { date: date })
    };

    patchSchedule(element._id, dataToSubmit)
      .then((res) => {
        if (res)
          setStatus({
            success: true,
            message: 'Agenda Actualizada Correctamente'
          });
        setShouldOpenModal(true);
      })
      .catch((err) => {
        if (err)
          setStatus({
            success: false,
            message: 'Error al actualizar la agenda'
          });
        setShouldOpenModal(true);
      });
  };
  // {...(!errors.oldPassword && !errors.newPassword
  //   ? { isDisabled: false }
  //   : { isDisabled: true })}
  return (
    <div className='flex flex-col items-center gap-3 my-2'>
      <Checkbox
        isSelected={availability}
        onValueChange={setAvailability}
        onChange={() => {
          if (availability) {
            setActiveHours([]);
          }
        }}
        color='secondary'
      >
        Estas Disponible?
      </Checkbox>
      {availability ? (
        <ScrollShadow
          hideScrollBar
          className='h-[200px] flex flex-col items-center'
        >
          {hours.map((hour) => (
            <Checkbox
              key={`${dayjs(element.date).format('dddd')}-${hour}`}
              color='secondary'
              isSelected={activeHours.includes(hour)}
              onValueChange={
                activeHours.includes(hour)
                  ? () => setActiveHours(activeHours.filter((h) => h !== hour))
                  : () => setActiveHours([...activeHours, hour])
              }
            >
              {`${hour.toString().padStart(2, '0')}:00`}
            </Checkbox>
          ))}
        </ScrollShadow>
      ) : (
        <div className='h-[200px]'> </div>
      )}

      <div className='flex gap-2'>
        <Button
          radius='sm'
          type='button'
          onPress={() => {
            setActiveHours(element.activeHours);
            setAvailability(element.availability);
          }}
          className='text-white w-fit bg-wkablack font-oswald hover:bg-zinc-700'
        >
          <Restart />
        </Button>
        <Button
          radius='sm'
          type='button'
          onPress={onSubmit}
          className='text-white w-fit bg-wkablack font-oswald hover:bg-zinc-700'
        >
          {dayjs(element.date).isAfter(dayjs()) ? 'Modificar' : 'Actualizar'}
        </Button>
      </div>
      {shouldOpenModal && (
        <ModalOnCall
          status={status}
          shouldOpenModal={shouldOpenModal}
          setShouldOpenModal={setShouldOpenModal}
        />
      )}
    </div>
  );
}
