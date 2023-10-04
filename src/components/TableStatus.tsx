import SwitchActiveInactive from "./SwitchActiveInactive";

export default function TableStatus() {
  return (
    <>
      <table className="flex flex-col w-auto md:max-w-[38rem] justify-center border-separate border-spacing-y-4 border-spacing-x-[4.5rem] text-sm  font-roboto mx-5">
        <thead className=" mb-2">
          <tr className="flex justify-around mx-10 ">
            <th className="tracking-[8px] text-base"> Hora </th>
            <th className="tracking-[8px] text-base pr-3"> Status </th>
          </tr>
        </thead>
        <tbody className=" flex flex-col items-center h-80 overflow-auto">
          <tr>
            <td>08:00 - 09:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>09:00 - 10:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>10:00 - 11:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>12:00 - 13:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>13:00 - 14:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>14:00 - 15:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>15:00 - 16:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>16:00 - 17:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>17:00 - 18:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>18:00 - 19:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>19:00 - 20:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>20:00 - 21:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>21:00 - 22:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
          <tr>
            <td>23:00 - 24:00</td>
            <td>
              <SwitchActiveInactive></SwitchActiveInactive>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
