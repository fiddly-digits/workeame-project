import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Image } from '@nextui-org/react';

export default function MenuItem({
  icon,
  action,
  position,
  reference,
  onClick
}) {
  const Active =
    'bg-white shadow-[0_2px_13px_-5px_rgba(0,0,0,0.3)] w-[240px] h-[48px] flex justify-between items-center gap-3 px-5 text-gray-700 text-sm font-roboto hover:shadow-md hover:bg-secondary hover:text-black duration-300';
  return (
    <li>
      <Link
        className={clsx(
          [Active],
          { 'rounded-t-xl': position === 'top' },
          { 'rounded-b-xl': position === 'bottom' }
        )}
        to={{
          pathname: reference
        }}
        onClick={onClick}
      >
        <Image src={icon} alt={icon} width={20} height={20}></Image>
        <p disabled>{action}</p>
        <Image
          src='/chevron.svg'
          alt='chevron'
          width={20}
          height={20}
          className='rotate-90'
        ></Image>
      </Link>
    </li>
  );
}
