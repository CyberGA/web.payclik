import PrimaryBtn from "./primaryBtn";
import { useGlobalContext } from "@/contexts/global-context";
import { useEffect } from "react";
import { Loader } from "@mantine/core";
import { SiEthereum } from "react-icons/si";
import shortened from "@/lib/shortend";
import { TbCopy } from "react-icons/tb";
import getDate from "@/lib/date";



function Menu() {
  const { setOpened, getProviderOrSigner, refreshWallet, state, getUserBalance, balance } = useGlobalContext();

  function copyAddr() {
    navigator.clipboard.writeText(state.address);
  }

  useEffect(() => {
    refreshWallet();
    getUserBalance()
  }, []);

  return (
    <div className="flex flex-col">
      <p className="text-cGrey text-[14px] font-inder mb-4 italix">
        {getDate()}
      </p>

      <div
        className="flex flex-col items-center justify-center w-[250px] py-10 px-10 bg-black rounded-[8px] cursor-pointer"
        onClick={getUserBalance}
      >
        <p className="text-white text-[20px] font-inder">Balance</p>
        <p className="text-white text-[32px] font-bold font-inder">
          {balance.length == 0 ? <Loader color="indigo" /> : `${balance}ETH`}
        </p>
      </div>
      <div
        className="flex md:hidden flex-row gap-x-8 items-center justify-center text-cGrey font-inder font-medium text-lg mt-2"
        onClick={copyAddr}
      >
        {state.address.length == 0 ? (
          <Loader color="indigo" />
        ) : (
          <div className="flex flex-row items-center justify-center w-full gap-x-1 rounded-lg border-[2px] px-4 py-2 cursor-pointer bg-secondary/30">
            <SiEthereum size={16} color="#66" />
            <p>{shortened(state.address)}</p>
            <TbCopy size="16" />
          </div>
        )}
      </div>
      {/* <div className="flex flex-col items-center justify-center w-[250px] py-10 px-10 bg-secondary rounded-[8px] mt-9">
        <p className="text-white text-[20px] font-inder">Username</p>
        <p className="text-white text-[32px] font-bold font-inder">CyberGA</p>
      </div> */}

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

export default Menu;
