import HeaderApp from '../components/HeaderApp';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <HeaderApp />
      <Outlet />
      <Footer />
    </>
  );
}
