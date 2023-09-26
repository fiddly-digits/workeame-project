import clsx from 'clsx';

import { Image } from '@nextui-org/react';

export default function MenuItem({
  icon,
  action,
  reference,
  position,
  isDisabled,
  isPressed
}) {
  const Active =
    'bg-white shadow-[0_2px_13px_-5px_rgba(0,0,0,0.3)] w-[240px] h-[48px] flex justify-between items-center gap-3 px-5 text-gray-700 text-sm font-roboto hover:shadow-md hover:bg-secondary hover:text-black duration-300';
  const Disabled =
    'bg-slate-500 shadow-[0_2px_13px_-5px_rgba(0,0,0,0.3)] w-[240px] pointer-events-none h-[48px] flex justify-between items-center gap-3 px-5 text-gray-400 text-sm font-roboto hover:shadow-md hover:bg-secondary hover:text-black duration-300';
  const Pressed =
    'bg-white shadow-[0_2px_13px_-5px_rgba(0,0,0,0.3)] w-[240px] h-[48px] flex justify-between items-center gap-3 px-5 text-gray-700 text-sm font-roboto hover:shadow-md hover:bg-secondary hover:text-black duration-300';
  return (
    <li>
      <a
        className={clsx(
          isPressed ? [Pressed] : [Active],
          isDisabled ? [Disabled] : [Active],
          { 'rounded-t-xl': position === 'top' },
          { 'rounded-b-xl': position === 'bottom' }
        )}
        href={reference}
      >
        <Image src={icon} alt={icon} width={20} height={20}></Image>
        <p disabled href={reference}>
          {action}
        </p>
        <Image
          src='chevron.svg'
          alt='chevron'
          width={20}
          height={20}
          className='rotate-90'
        ></Image>
      </a>
    </li>
  );
}
