import { Image } from '@nextui-org/react';
export default function MenuItem({ icon, action, reference, customClassName }) {
  const defaultClassName =
    'bg-white shadow-[0_2px_13px_-5px_rgba(0,0,0,0.3)] w-[240px] h-[48px] flex justify-between items-center gap-3 px-5 text-gray-700 text-sm font-roboto hover:shadow-md hover:bg-secondary hover:text-black duration-300';
  const combinedClassName = customClassName
    ? `${defaultClassName} ${customClassName}`
    : defaultClassName;

  return (
    <button className={combinedClassName}>
      <Image src={icon} alt={icon} width={20} height={20}></Image>
      <a href={reference}>{action}</a>
      <Image
        src='chevron.svg'
        alt='chevron'
        width={20}
        height={20}
        className='rotate-90'
      ></Image>
    </button>
  );
}
