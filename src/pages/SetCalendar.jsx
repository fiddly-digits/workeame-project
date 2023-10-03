import HeaderApp from "../components/HeaderApp";
import Footer from "../components/Footer";
import { useState } from "react";
import {
  CheckboxGroup,
  Checkbox,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Button,
} from "@nextui-org/react";
import InputHours from "../components/InputHours";
import TableStatus from "../components/TableStatus";

let days = [
  { label: "Lunes", value: "monday" },
  { label: "Martes", value: "tuesday" },
  { label: "Míercoles", value: "wednesday" },
  { label: "Jueves", value: "thursday" },
  { label: "Viernes", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" },
];

export default function SetCalendar() {
  const [selectedOption, setSelectedOption] = useState("hide");
  const [showComponent, setShowComponent] = useState(false);

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setShowComponent(e.target.value === "show");
  };
  return (
    <>
      <div className="bg-fourth">
        <HeaderApp></HeaderApp>
        <main className="flex flex-col h-full w-auto md:px-10 py-10 m-auto gap-10 ">
          <form action="" className="flex flex-col gap-5">
            <section className="flex flex-col  mx-10 md:mx-40">
              <h2 className="flex justify-center text-center font-oswald  text-3xl">
                Configura tu calendario
              </h2>
              <CheckboxGroup
                label="Días de la semana con servicio:"
                orientation="horizontal"
                color="default"
                className="flex items-center gap-4 font-roboto mx-5 my-5"
                size="sm"
                radius="md"
              >
                <div className="flex flex-wrap justify-center md:flex-nowrap gap-5 md:gap-4">
                  <Checkbox value="lunes">Lunes</Checkbox>
                  <Checkbox value="martes">Martes</Checkbox>
                  <Checkbox value="miercoles">Miércoles</Checkbox>
                  <Checkbox value="jueves">Jueves</Checkbox>
                  <Checkbox value="viernes">Viernes</Checkbox>
                  <Checkbox value="sabado">Sábado</Checkbox>
                  <Checkbox value="domingo">Domingo</Checkbox>
                </div>
              </CheckboxGroup>
              <div className="flex justify-center">
                <div className="h-96 w-96 md:w-[38rem] text-center bg-gray-300">
                  CALENDARIO
                </div>
              </div>
            </section>
            <section className="flex flex-col items-center mx-10 md:mx-40">
              <div className="justify-center my-8 w-full max-w-[38rem] ">
                <Select
                  label="Selecciona el horario para el día:"
                  labelPlacement="outside"
                  className="w-auto font-roboto"
                  variant="bordered"
                >
                  {days.map((day) => (
                    <SelectItem
                      key={day.value}
                      value={day.value}
                      className="font-roboto"
                    >
                      {day.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-row justify-between gap-5 w-full max-w-[38rem] mt-4">
                <InputHours label="Inicio"></InputHours>
                <InputHours label="Término"></InputHours>
              </div>
            </section>
            <section className="flex flex-col items-center mx-10 md:mx-40 my-10">
              <p className="font-roboto text-md ">
                ¿Tienes horas inactivas entre el inicio y el fin del horario?
              </p>
              <RadioGroup
                name="options"
                onChange={handleRadioChange}
                value={selectedOption}
                orientation="horizontal"
                color="secondary"
                size="md"
                className="flex font-roboto my-5 items-center"
              >
                <Radio value="hide" className="mx-5">
                  No
                </Radio>
                <Radio value="show" className="mx-5">
                  Si
                </Radio>
              </RadioGroup>
            </section>
            <div className="flex justify-center ">
              {showComponent && <TableStatus />}
            </div>
            <div className="flex justify-center my-10">
              <Button
                radius="sm"
                className="bg-black text-white font-semibold tracking-widest font-oswald hover:bg-zinc-700 w-60 px-8"
              >
                GUARDAR
              </Button>
            </div>
          </form>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
