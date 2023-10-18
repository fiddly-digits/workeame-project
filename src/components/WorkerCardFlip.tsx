import { Card, CardBody, CardFooter } from '@nextui-org/card';

interface Props {
  name: string;
  job?: string;
  picture: string;
  address: string;
  description: string;
  position: string;
}

export default function WorkerCardFlip({
  name,
  job,
  picture,
  address,
  description,
  position
}: Props) {
  return (
    <div className='flip-card'>
      <div className='flip-card-inner max-h-[28rem]'>
        <Card
          shadow='sm'
          isPressable
          onPress={() => console.log('item pressed')}
          className={`m-2 flip-card-front rounded-${position}-[80px]`}
        >
          <CardBody className='p-0 overflow-hidden shadow-sm radius-sm'>
            <img
              alt={`${name}-${job}`}
              className='object-cover w-full h-full'
              src={picture}
            />
          </CardBody>
          <CardFooter className='flex-col font-roboto text-large'>
            <b className='text-2xl font-bold uppercase tracking-[2px]'>
              {name}
            </b>
            <p className=' text-base text-gray-500 font-roboto font-extralight uppercase tracking-[1.5px]'>
              {job}
            </p>
          </CardFooter>
        </Card>
        {/* Card behind */}
        <div
          className={`flip-card-back rounded-${position}-[80px] flex justify-center`}
        >
          <Card
            shadow='sm'
            isPressable
            onPress={() => console.log('item pressed')}
            className={`p-4 w-60 h-80 flip-card-front rounded-${position}-[80px]`}
          >
            <CardBody className='p-0 overflow-visible shadow-sm radius-sm'>
              <h2 className='text-3xl font-bold uppercase tracking-[3px] my-2'>
                {name}
              </h2>
              <h2 className='text-xl text-gray-500 font-roboto font-extralight uppercase tracking-[2px]'>
                {job}
              </h2>
              <h3 className='text-[16px] font-roboto font-medium uppercase tracking-[4px] my-2'>
                {address}
              </h3>
              <p className='my-5 font-light text-justify text-gray-600 font-roboto'>
                {description}
              </p>
            </CardBody>
            <CardFooter className='flex-col font-roboto text-md'>
              <a
                href='.'
                className='flex items-center gap-2 bottom-buttons-container'
              >
                {' '}
                <p className='font-bold tracking-wider text-start font-roboto'>
                  {' '}
                  Conecta con {name}
                </p>
                <img
                  src='/arrow.svg'
                  width={30}
                  height={30}
                  alt='logo'
                  className='-rotate-90 swing'
                />
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
