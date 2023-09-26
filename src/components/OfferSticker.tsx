interface Props {
  className?: string;
  offer: number;
  description: string;
}

export default function OfferSticker({ className, offer, description }: Props) {
  return (
    <>
      <div
        className={`rounded-md p-1 h-auto text-black text-xs font-roboto font-semibold text-center ${className} `}
      >
        -{offer}% <span className="font-normal">{description}</span>
      </div>
    </>
  );
}
