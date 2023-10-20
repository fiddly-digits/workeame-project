import { Input } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  label: 'text';
}

export default function InputHours({ label }: Props) {
  const [timetable, setTimetable] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const inputHours = e.target.value;
    // Validando el formato del horario HH:mm y que no supere las 24 horas
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(inputHours)) {
      const [horas, minutos] = inputHours.split(':');
      if (parseInt(horas, 10) <= 23 && parseInt(minutos, 10) <= 59) {
        setTimetable(inputHours);
        setError('');
        return;
      }
    }
    setTimetable(inputHours);
    setError(
      'Horario no válido. El formato debe ser HH:mm y no debe superar las 24 horas.'
    );
  };

  return (
    <>
      <Input
        type='text'
        value={timetable}
        onChange={handleInputChange}
        errorMessage={error}
        variant='bordered'
        label={`Horario de ${label} de Servicios (HH:mm)`}
        labelPlacement='outside'
        placeholder='00:00'
        className='text-xs font-roboto'
        endContent={
          <div className='flex items-center pointer-events-none'>
            <img src='/clock.svg' alt='clock'></img>
          </div>
        }
      ></Input>
    </>
  );
}
