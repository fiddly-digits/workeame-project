import HeaderApp from '../components/HeaderApp';
import Footer from '../components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
//import axios from 'axios';
import { useEffect } from 'react';

export default function Auth() {
  const navigate = useNavigate();
  // const [userData, setUserData] = useState<object>();
  // useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   if (token) {
  //     const payload: string = token.split('.')[1];
  //     const plainPayload = JSON.parse(atob(payload));
  //     axios
  //       .get(`http://localhost:8080/api/v1/user/${plainPayload.id}`)
  //       .then((res) => {
  //         setUserData(res.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);
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
      <Footer />
    </>
  );
}
