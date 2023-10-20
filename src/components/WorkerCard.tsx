import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
interface Props {
  name: string;
  job?: string;
  picture: string;
  className?: string;
}

export default function WorkerCard({ name, job, picture, className }: Props) {
  return (
    <Card
      shadow='sm'
      isPressable
      className={`m-2 ${className} max-w-[20rem] max-h-[30rem] `}
    >
      <CardBody className='p-0 overflow-hidden rounded-t-sm shadow-sm'>
        <Image
          shadow='sm'
          radius='lg'
          width='100%'
          alt={`${name}-${job}`}
          className='object-cover w-full rounded-none'
          src={picture}
        />
      </CardBody>
      <CardFooter className='flex-col font-roboto text-large '>
        <b className='text-2xl font-bold uppercase tracking-[2px]'>{name}</b>
        <p className=' text-base text-gray-500 font-roboto font-extralight uppercase tracking-[1.5px]'>
          {job}
        </p>
      </CardFooter>
    </Card>
  );
}
