import HeaderApp from '../components/HeaderApp';
import Footer from '../components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Auth() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, token]);

  return (
    <>
      <HeaderApp color={'transparent'} />
      <Outlet />
      <Footer letters='relative -right-56' />
    </>
  );
}
