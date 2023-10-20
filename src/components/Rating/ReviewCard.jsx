import { useState } from 'react';
import { Star } from 'iconoir-react';
import { Textarea } from '@nextui-org/react';

export default function ReviewCard(selectedBooking) {
  const [rating, setRating] = useState(0);

  return (
    <div className='flex flex-col items-center gap-3'>
      <h3 className='font-roboto'>
        Reseña el servicio de{' '}
        <span className='text-secondary'>{selectedBooking.provider.name}</span>
      </h3>
      <div className='flex'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button type='button' key={index} onClick={() => setRating(index)}>
              {}
              <Star {...(index <= rating && { fill: false })} />
            </button>
          );
        })}
      </div>
      <Textarea
        label='Reseña'
        variant='bordered'
        type='text'
        className='w-1/2 max-w-xl font-roboto'
      />
    </div>
  );
}
