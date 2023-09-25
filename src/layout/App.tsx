import HeaderApp from "../components/HeaderApp";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [userData, setUserData] = useState<object>();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const payload: string = token.split(".")[1];
      const plainPayload = JSON.parse(atob(payload));
      axios
        .get(`http://localhost:8080/api/v1/user/${plainPayload.id}`)
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <HeaderApp userData={userData} />
      <Outlet context={userData} />
      <Footer />
    </>
  );
}
