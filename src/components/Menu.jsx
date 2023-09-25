import { Card, CardBody } from '@nextui-org/card';
import MenuItem from './MenuItem';

export default function Menu() {
  return (
    <Card
      shadow='sm'
      className='m-2 p-5 w-80 min-h-auto max-h-[46rem] rounded-xl'
    >
      <CardBody className='flex p-0 overflow-visible shadow-sm '>
        <h1 className='my-3 text-3xl font-bold tracking-wider text-center font-oswald'>
          WORKEA
        </h1>
        <h3 className='font-roboto text-sm text-start my-3 tracking-[2px] text-gray-500'>
          General
        </h3>
        <ul className='flex flex-col items-center gap-3'>
          <li>
            <MenuItem
              icon='presentation.svg'
              action='Visita el sitio'
              reference=''
              customClassName='rounded-t-xl'
            ></MenuItem>
          </li>
          <li>
            <MenuItem
              icon='receipt-tax.svg'
              action='Promociones'
              reference=''
            ></MenuItem>
          </li>
          <li>
            <MenuItem
              icon='check-circle-t.svg'
              action='Citas'
              reference=''
            ></MenuItem>
          </li>
          <li>
            <MenuItem
              icon='chat-alt.svg'
              action='Chats'
              reference=''
            ></MenuItem>
          </li>
          <li>
            <MenuItem
              icon='calendar.svg'
              action='Calendario'
              reference=''
            ></MenuItem>
          </li>
          <li>
            <MenuItem
              icon='cog.svg'
              action='Configuración'
              reference=''
              customClassName='rounded-b-xl'
            ></MenuItem>
          </li>
        </ul>
        <h3 className='font-roboto text-sm text-start my-3 tracking-[2px] text-gray-500'>
          Cuenta
        </h3>
        <ul className='flex flex-col items-center gap-3'>
          <li>
            <MenuItem
              icon='presentation.svg'
              action='Datos de la Cuenta'
              reference=''
              customClassName='rounded-t-xl'
            ></MenuItem>
          </li>
          <li>
            <MenuItem
              icon='bell.svg'
              action='Notificaciones'
              reference=''
            ></MenuItem>
          </li>
          <li>
            <MenuItem
              icon='sign-out.svg'
              action='Salir'
              reference=''
              customClassName='rounded-b-xl'
            ></MenuItem>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
