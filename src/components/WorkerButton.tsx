import clsx from 'clsx';

interface Props {
  action: string;
  beingWorker?: boolean;
  className?: string;
}

export default function WorkerButton({
  action,
  beingWorker,
  className
}: Props) {
  return (
    <div
      className={`flex items-center h-10 gap-2 px-5 text-black bg-transparent border border-white rounded-md shadow-md font-oswald ${className}`}
    >
      <a href='.' className='font-bold text-black hover:text-white font-oswald'>
        {action}
      </a>
      <span
        className={clsx(`text-white font-bold ${className}`, {
          hidden: !beingWorker
        })}
      >
        {' '}
        /{' '}
      </span>
      <a
        href='.'
        className={clsx(
          `hover:text-black text-white font-oswald font-bold ${className}`,
          { hidden: !beingWorker }
        )}
      >
        Ser un Worker
      </a>
    </div>
  );
}
