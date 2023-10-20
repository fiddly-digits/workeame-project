import { Switch } from '@nextui-org/switch';
import clsx from 'clsx';
import { useState } from 'react';

export default function SwitchActiveInactive() {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className='flex gap-1'>
      <Switch
        color='secondary'
        className={clsx(
          ` bg-gray-200 px-2 rounded-full text-center font-roboto text-small text-black`,
          { 'bg-secondary': isSelected }
        )}
        isSelected={isSelected}
        onValueChange={setIsSelected}
      >
        {isSelected ? 'Activo' : 'Inactivo'}
      </Switch>
    </div>
  );
}
