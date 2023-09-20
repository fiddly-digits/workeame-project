interface Props {
  className?: string;
}

export default function DualButton({ className }: Props) {
  return (
    <div
      className={`bg-transparent border border-white rounded-md h-10 flex items-center gap-2 px-5 text-black font-oswald shadow-md ${className}`}
    >
      <button className='hover:text-white'>Quiero un Worker</button>
      <p>/</p>
      <button className='hover:text-white'>ser un Worker</button>
    </div>
  );
}
