interface Props {
  className?: string;
}

export default function DualButton({ className }: Props) {
  return (
    <div
      className={`bg-transparent border border-black rounded-md h-10 flex items-center gap-2 px-5 text-black font-oswald shadow-md ${className}`}
    >
      <a href='#fifth-section' className='hover:text-white'>
        Quiero un Worker
      </a>
      <p>/</p>
      <a href='' className='hover:text-white'>
        ser un Worker
      </a>
    </div>
  );
}
