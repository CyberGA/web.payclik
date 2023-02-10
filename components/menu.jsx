import PrimaryBtn from "./primaryBtn";
import { useGlobalContext } from "@/contexts/global-context";
import { useEffect, useState } from "react";
import { Loader, Skeleton } from "@mantine/core";
import getDate from "@/lib/date";
import { ConnectWallet, useAddress, useBalance } from "@thirdweb-dev/react";

function Menu() {
  const address = useAddress();
  const userBalance = useBalance();
  const { setOpened, setAlertMsg, setShowAlert } = useGlobalContext();

  const [balance, setBalance] = useState("");

  const getMyBal = async () => {
    setBalance((prev) => "");

    setTimeout(() => {
      setBalance((prev) => userBalance.data);
    }, 1500);
  };

  useEffect(() => {
    if (address) {
      getMyBal();
    }
  }, [address]);

  return (
    <div className="flex flex-col">
      <div className="flex sm:hidden w-full flex-row items-center justify-start my-6">
        <ConnectWallet />
      </div>
      <p className="text-cGrey text-[14px] font-inder mb-4 italix">
        {getDate()}
      </p>

      <Skeleton visible={balance?.length == 0}>
        <div
          className="flex flex-col items-center justify-center w-[250px] py-10 px-10 bg-black rounded-[8px] cursor-pointer"
          onClick={getMyBal}
        >
          <p className="text-white text-[20px] font-inder">Balance</p>
          <p className="text-white text-[32px] font-bold font-inder">
            {`${balance.displayValue?.substring(0, 5)}${balance.symbol}`}
          </p>
        </div>
      </Skeleton>

      {/* <div className="flex flex-col items-center justify-center w-[250px] py-10 px-10 bg-secondary rounded-[8px] mt-9">
        <p className="text-white text-[20px] font-inder">Username</p>
        <p className="text-white text-[32px] font-bold font-inder">CyberGA</p>
      </div> */}

      <div className="mt-6">
        <PrimaryBtn
          text="Request Payment"
          sx="shadow-lg"
          onClick={() => {
            if (address) {
              setOpened((prev) => true);
            } else {
              setAlertMsg((prev) => "Connect to your wallet");
              setShowAlert((prev) => true);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Menu;
