import clsx from 'clsx';
import WorkerButton from './WorkerButton';

interface Props {
  nextTitle?: string;
  reference: string;
  button?: boolean;
}

export default function BottomButtons({ nextTitle, reference, button }: Props) {
  return (
    <div className='flex flex-wrap self-start gap-5 py-12 lg:order-last lg:px-28'>
      <a
        href={`#${reference}-section`}
        className={clsx('flex items-center gap-2 bottom-buttons-container', {
          hidden: !nextTitle
        })}
      >
        <img src='/arrow.svg' alt='logo' className='w-8 h-8 swing' />
        <h4 className='font-bold font-oswald line'>{nextTitle}</h4>
      </a>
      <div
        className={clsx('block order-first md:order-last', { hidden: !button })}
      >
        <WorkerButton action='Quiero un Worker' beingWorker />
      </div>
    </div>
  );
}
