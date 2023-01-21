import PrimaryBtn from "./primaryBtn";
import { useGlobalContext } from "@/contexts/global-context";


function Menu() {
  const { setOpened } = useGlobalContext();

  return (
    <div className="flex flex-col">
      <p className="text-cGrey text-[14px] font-inder mb-4 italix">
        Today 15 Jun, 2022
      </p>

      <div className="flex flex-col items-center justify-center w-[250px] py-10 px-10 bg-black rounded-[8px]">
        <p className="text-white text-[20px] font-inder">Balance</p>
        <p className="text-white text-[32px] font-bold font-inder">0.00ETH</p>
      </div>
      <div className="flex flex-col items-center justify-center w-[250px] py-10 px-10 bg-secondary rounded-[8px] mt-9">
        <p className="text-white text-[20px] font-inder">Username</p>
        <p className="text-white text-[32px] font-bold font-inder">CyberGA</p>
      </div>

      <div className="mt-9">
        <PrimaryBtn
          text="Request Payment"
          sx="shadow-lg"
          onClick={() => setOpened((prev) => true)}
        />
      </div>
    </div>
  );
}

export default Menu