import { Select, SelectItem, Button } from "@nextui-org/react";
import { categories, expertise } from "../utils/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChangeText from "../components/ChangeText";

const { VITE_API_URL, VITE_USER_WORKER } = import.meta.env;

const schema = Yup.object().shape({
  expYears: Yup.string().required("Especificar tu experiencia es necesario"),
  category: Yup.string().required("La categoria es requerida"),
});

export default function BecomeWorker() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const token = sessionStorage.getItem("token");
    const userData = {
      type: "worker",
      expertise: data.expYears,
      category: data.category,
    };
    axios
      .patch(VITE_API_URL + VITE_USER_WORKER, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard", { replace: true });
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col items-center w-full my-10">
      <h3 className="text-2xl text-center font-oswald">
        Convertete en <span className="font-bold">Worker</span> para obtener
        todas las ventajas
      </h3>
      <div className="flex justify-center m-5">
        <ChangeText></ChangeText>
      </div>
      <form
        className="flex flex-col gap-3 m-5 grow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 mt-5">
          <Select
            isRequired
            size="sm"
            variant="bordered"
            label="Categoria"
            errorMessage={errors.category?.message}
            isInvalid={!!errors.category}
            {...register("category")}
          >
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            size="sm"
            variant="bordered"
            label="Años de experiencia"
            errorMessage={errors.expYears?.message}
            isInvalid={!!errors.expYears}
            {...register("expYears")}
          >
            {expertise.map((exp) => (
              <SelectItem key={exp} value={exp}>
                {exp}
              </SelectItem>
            ))}
          </Select>
          <div className="flex justify-between gap-3 mt-10">
            <Button
              size="lg"
              radius="md"
              onClick={() => {
                navigate(
                  "/dashboard",
                  { relativeTo: "/dashboard" },
                  { replace: true }
                );
                location.reload();
              }}
              className="text-white bg-wkablack font-oswald hover:cursor-pointer hover:bg-zinc-400"
            >
              AUN NO
            </Button>
            <Button
              size="lg"
              radius="md"
              type="submit"
              className="text-white bg-wkablack font-oswald hover:cursor-pointer"
              startContent={<img src="/arrow-right.svg" alt="next" />}
            >
              SE UN WORKER
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
