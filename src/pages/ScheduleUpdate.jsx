import { useEffect, useState } from 'react';
import { fetchSchedule } from '../utils/fetch';
import { Spinner } from '@nextui-org/react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import isToday from 'dayjs/plugin/isToday';
import DayJSUtc from 'dayjs/plugin/utc';
import DayJSTimezone from 'dayjs/plugin/timezone';
import DaySchedule from '../components/DaySchedule';

dayjs.locale('es');
dayjs.extend(DayJSUtc);
dayjs.extend(DayJSTimezone);
dayjs.extend(isToday);

export default function ScheduleUpdate() {
  const [schedule, setSchedule] = useState(null);

  const nextDayOfWeek = (dayOfWeek) => {
    const now = dayjs();
    const day = now.day(dayOfWeek);
    return day.isBefore(now) ? day.add(1, 'week') : day;
  };

  useEffect(() => {
    fetchSchedule('GET', { accept: 'application/json' })
      .then((res) => {
        setSchedule(res);
      })
      .catch((err) => {
        //TODO: HANDLE ERROR
        console.log(err);
      });
  }, []);

  if (!schedule) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spinner color='secondary' label='Cargando...' size='lg' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3 m-10'>
      <h2 className='w-full mb-8 text-2xl text-black font-oswald'>
        Configura tu Agenda
      </h2>
      <div className='flex flex-col capitalize'>
        {schedule.filter((element) => dayjs(element.date).isAfter(dayjs()))
          .length > 0 && (
          <h2 className='w-full mb-8 text-xl tracking-wider text-zinc-500 font-oswald'>
            Agenda Actual
          </h2>
        )}
        <div className='flex flex-wrap items-center my-5 h-[25rem] lg:h-full overflow-auto justify-around gap-10'>
          {schedule.map((element, index) => {
            if (
              dayjs(element.date).isAfter(dayjs()) ||
              dayjs(element.date).isToday(dayjs())
            ) {
              return (
                <div
                  className='border rounded-md bg-fourth shadow-xl w-[14rem] p-3 font-roboto'
                  key={`incoming-${index}`}
                >
                  <p className='font-semibold text-center font-roboto'>
                    {dayjs(element.date).format('dddd, D [/] MMM YYYY')}
                  </p>
                  <DaySchedule element={element} />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className='flex flex-col mt-5 capitalize'>
        {schedule.filter((element) => dayjs(element.date).isBefore(dayjs()))
          .length > 0 && (
          <h2 className='w-full my-5 text-xl tracking-wider text-zinc-500 font-oswald'>
            Agenda Próxima
          </h2>
        )}
        <div className='flex flex-wrap items-center h-[28rem] my-5 overflow-auto justify-around gap-10'>
          {schedule
            .sort((a, b) => dayjs(a.date).date() - dayjs(b.date).date())
            .map((element, index) => {
              if (
                dayjs(element.date).isBefore(dayjs()) &&
                !dayjs(element.date).isToday(dayjs())
              ) {
                console.log(element.date);
                return (
                  <div
                    className=' rounded-md bg-zinc-300 shadow-xl w-[14rem] p-3 font-roboto'
                    key={`incoming-${index}`}
                  >
                    <p className='font-semibold text-center font-roboto'>
                      {nextDayOfWeek(dayjs(element.date).day()).format(
                        'dddd D [/] MMM YYYY'
                      )}
                      {/* {dayjs(element.date).add(1, 'week').isBefore(dayjs())
                        ? dayjs(element.date)
                            .add(2, 'week')
                            .format('dddd D [/] MMM YYYY')
                        : dayjs(element.date)
                            .add(1, 'week')
                            .format('dddd D [/] MMM YYYY')} */}
                    </p>

                    <DaySchedule element={element} isNext />
                  </div>
                );
              }
            })}
        </div>
        {}
      </div>
    </div>
  );
}
