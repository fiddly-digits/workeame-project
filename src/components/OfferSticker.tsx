interface Props {
  className?: string;
  offer: number;
  description: string;
}

export default function OfferSticker({ className, offer, description }: Props) {
  return (
    <>
      <div
        className={`rounded-md p-1 text-black text-xs font-roboto font-semibold ${className} `}
      >
        -{offer}% <span className="font-normal">{description}</span>
      </div>
    </>
  );
}
