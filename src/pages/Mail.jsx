import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { fetchUser } from "../utils/fetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  email: Yup.lazy((value) =>
    !value ? Yup.string() : Yup.string().email("El email no es válido")
  ),
});

export default function Mail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    fetchUser("GET", { accept: "application/json" })
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function onSubmit(data) {
    console.log(data);
    const token = sessionStorage.getItem("token");
    axios
      .patch("http://localhost:8080/api/v1/user/mailChange/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        sessionStorage.removeItem("token");
        navigate("/login", { replace: true });
        window.location.reload();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }
  return (
    <div className="flex flex-col m-10">
      <h2 className="w-full mb-8 text-2xl text-black font-oswald">
        Modifica tu Mail
      </h2>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-gray-500 font-roboto">
          Email Actual:{" "}
          <span className="font-roboto text-secondary">{userData.email}</span>
        </p>
        <Input
          size="sm"
          type="email"
          label="Email"
          variant="bordered"
          description="Si actualizas tu correo, deberás volver a verificarlo"
          className="max-w-xs"
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          onValueChange={(value) => {
            if (value) {
              setStatus(true);
            } else {
              setStatus(false);
            }
          }}
          {...register("email")}
        />
        {errorMessage && (
          <div className="flex justify-center text-red-400 font-roboto">
            {errorMessage}
          </div>
        )}
        <Button
          size="lg"
          radius="md"
          type="submit"
          className="text-white bg-wkablack font-oswald hover:cursor-pointer"
          {...(status && !errors.email
            ? { isDisabled: false }
            : { isDisabled: true })}
          startContent={<img src="/arrow-right.svg" alt="next" />}
        >
          CAMBIA
        </Button>
      </form>
    </div>
  );
}
