import DualButton from './DualButton';
import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger
} from '@nextui-org/react';

type Props = {
  userData?: object;
};

export default function HeaderApp({ userData }: Props) {
  console.log(userData);
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between h-20 px-5 bg-fourth grow lg:justify-evenly lg:px-24'>
      <h1 className='text-5xl font-bold w-fit h-fit font-oswald'>
        W<span className='lg:hidden'>ORKEA</span>
      </h1>
      <nav className='items-center hidden gap-5 lg:flex'></nav>
      {userData ? (
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              src={userData?.photo}
              size='md'
              as='button'
              isBordered
              showFallback
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='gap-2 h-14'>
              <p className='font-semibold font-roboto'>Bienvenido</p>
              <p className='font-semibold font-roboto'>{`${userData.name} ${userData.lastName}`}</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem key='logout' color='danger'>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <DualButton />
      )}
      {/* <DualButton /> */}
    </header>
  );
}
