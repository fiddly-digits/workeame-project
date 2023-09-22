// interface Props extends Partial<Pick<UseFormReturn, 'register'>> {
interface Props {
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  icon?: string;
}

export default function Input({ placeholder, icon, type }: Props) {
  return (
    <div
      className='flex mt-1 max-w-[307px] md:w-full px-3 py-2 bg-[#FFFFFF] rounded-md text-sm font-roboto shadow-md
focus:outline-none  hover:border-secondary hover:ring-1 hover:ring-secondary'
    >
      <input
        type={type}
        placeholder={placeholder}
        className='text-gray-500 placeholder-gray-500 bg-[#FFFFFF] grow focus:outline-none '
      />
      {icon && (
        <button>
          <img src={`/${icon}.svg`} alt='next' className='w-6 h-6' />
        </button>
      )}
    </div>
  );
}
