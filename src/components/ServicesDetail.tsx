import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/react";

export default function ServicesDetail() {
  return (
    <>
      <div className="w-full md:max-w-xl">
        <h2 className="flex justify-center font-oswald my-4">
          Detalla tu Servicio
        </h2>
        <div className="flex flex-col justify-center w-full md:max-w-xl gap-3">
          <Input
            type="text"
            label="Nombre del servicio"
            size="sm"
            isRequired
            isClearable
            className="font-roboto"
            variant="bordered"
          ></Input>
          <Input
            type="text"
            label="Detalle del servicio"
            size="sm"
            isRequired
            isClearable
            className="font-roboto"
            variant="bordered"
          ></Input>
          <div className="flex flex-row w-full gap-4 ">
            <Input
              type="text"
              label="Datos específicos"
              size="sm"
              isRequired
              isClearable
              className="font-roboto"
              variant="bordered"
            ></Input>
            <div className="flex w-[50%]">
              <Checkbox
                className="flex font-roboto"
                color="default"
                size="lg"
                radius="sm"
              >
                <span className="text-sm text-gray-700">A Convenir</span>
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
