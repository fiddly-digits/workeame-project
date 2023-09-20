interface Props {
  step?: number;
  text?: string;
  callout?: [string];
}

export default function SliderOnThird({ step, text, callout }: Props) {
  return (
    <>
      <div className='flex flex-col justify-center h-full p-10'>
        <p className='text-5xl font-bold font-oswald'>{step}</p>
        <p className=''>
          <span className='font-bold'>{callout}</span> {text}
        </p>
      </div>
    </>
  );
}
