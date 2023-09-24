interface Props {
  type: 'button' | 'submit' | 'reset';
  action: string;
  reference?: string;
  icon?: string;
  value?: string;
  onClick?: () => void;
}

export default function ButtonBlack({ type, action, reference, icon }: Props) {
  return (
    <div className='bg-[#2C2A29] rounded-md max-w-[240px] h-[48px] flex justify-center items-center gap-3 px-5 text-white font-oswald shadow-md hover:bg-[#525252] duration-300 hover:cursor-pointer'>
      <img src={`/${icon}.svg`} alt='next' className='w-6 h-6' />
      <a type={type} href={reference}>
        {action}
      </a>
    </div>
  );
}
