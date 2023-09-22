import Input from './Input';

interface Props {
  visible: boolean;
}

export default function SectionRegister({ visible }: Props) {
  return (
    <section
      style={{ display: visible ? 'block' : 'none' }}
      className='flex flex-col items-center gap-3'
    >
      <div className='flex flex-col items-center gap-3'>
        <Input type={'text'} placeholder='Dirección 1*' />
        <Input type={'text'} placeholder='Dirección 2' />
        <Input type={'password'} placeholder='Repite tu Contraseña*' />
        <div className='flex flex-col justify-between gap-3 mx-auto md:flex-row md:w-full'>
          <Input type={'text'} placeholder='Subir foto' icon='info-circle' />
          <Input type={'text'} placeholder='Teléfono' />
        </div>
      </div>
    </section>
  );
}
