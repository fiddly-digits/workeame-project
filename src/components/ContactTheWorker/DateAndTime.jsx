import { Select, SelectItem, Button } from "@nextui-org/react";
import { SelectorIcon } from "./SelectorIcon";
import { useState } from "react";
import { Link } from "react-router-dom";

let availableHours = [
  { hour: "07:00 - 08:00", available: "true" },
  { hour: "08:00 - 09:00", available: "true" },
  { hour: "10:00 - 11:00", available: "true" },
  { hour: "11:00 - 12:00", available: "false" },
  { hour: "12:00 - 13:00", available: "false" },
  { hour: "13:00 - 14:00", available: "true" },
  { hour: "14:00 - 15:00", available: "true" },
  { hour: "15:00 - 16:00", available: "false" },
  { hour: "16:00 - 17:00", available: "false" },
  { hour: "17:00 - 18:00", available: "true" },
  { hour: "18:00 - 19:00", available: "true" },
  { hour: "19:00 - 20:00", available: "true" },
  { hour: "20:00 - 21:00", available: "false" },
  { hour: "21:00 - 22:00", available: "false" },
  { hour: "22:00 - 23:00", available: "true" },
  { hour: "23:00 - 24:00", available: "false" },
];

export default function DateAndTime() {
  const [selectedHour, setSelectedHour] = useState(null);

  const disabledKeys = availableHours
    .filter((hourData) => hourData.available === "false")
    .map((hourData) => hourData.hour);

  return (
    <>
      <section className="p-5">
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="font-roboto font-semibold text-md md:text-lg ">
              {" "}
              Elige la fecha y hora de tu cita.
            </p>
            <Link to={""}>
              <img
                src="/chat-alt.svg"
                alt="chat"
                className="h-6 md:hidden md:h-12 md:w-12 hover:font-bold hover:scale-105 transition-all duration-100"
              />
            </Link>
          </div>
          <div className="h-52 w-auto max-w-1/2 bg-gray-300 font-roboto">
            CALENDARIO
          </div>
          <div>
            <Select
              variant="bordered"
              label="Horario"
              placeholder="Selecciona horario disponible"
              labelPlacement="outside"
              className="max-w-xs font-roboto"
              value={selectedHour}
              onChange={(value) => setSelectedHour(value)}
              disabledKeys={disabledKeys}
              disableSelectorIconRotation
              selectorIcon={<SelectorIcon />}
            >
              {availableHours.map((hour) => (
                <SelectItem key={hour.hour}>{hour.hour}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-row justify-between mt-3">
            <Link to={""} className=" flex items-center">
              <img
                src="/arrow.svg"
                alt="arrow"
                className="scale-75 rotate-90 md:h-12 md:w-12  hover:scale-[.85] transition-all duration-75 "
              />
              <span className="font-oswald hover:underline transition-all duration-400">
                Regresar
              </span>
            </Link>
            <Link to={""}>
              <img
                src="/chat-alt.svg"
                alt="chat"
                className="scale-75 hidden md:block md:h-12 md:w-12 hover:font-bold  hover:scale-[.85] transition-all duration-100"
              />
            </Link>
            <Button
              radius="md"
              type="submit"
              className="text-white bg-wkablack font-oswald hover:cursor-pointer w-40"
            >
              AGENDAR
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
