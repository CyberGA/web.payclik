import { Modal } from "@mantine/core";
import PrimaryBtn from "@/components/primaryBtn";
import { usePaymentContext } from "@/contexts/payment";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { PAYCLIK_CONTRACT_ADDRESS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { RiCloseCircleFill } from "react-icons/ri";
import shortened from "@/lib/shortend";
import { ethers } from "ethers";

export default function PaymentResult() {
  const { opened, setOpened } = usePaymentContext();
  const { contract } = useContract(PAYCLIK_CONTRACT_ADDRESS);
  const [notification, setNotification] = useState({});
  const address = useAddress();

  function onCloseFunc() {
    setOpened(prev => false);
    contract?.events.removeAllListeners();
  }

  useEffect(() => {
    if (address && contract) {
      contract.events.addEventListener("TransactionStatus", (event) => {
        if (event.data.to == address) {
          setNotification((prev) => event.data);
          setOpened((prev) => true);
        }
      });
    }

    return () => {
      contract?.events.removeAllListeners();
    };
  }, [contract]);

  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      size="md"
      overflow="outside"
      centered
      withCloseButton={false}
    >
      <div className="pb-20 pt-10">
        <p className="text-cGrey text-[22px] font-exo font-bold text-center">
          Account Notification
        </p>
        <div className="flex flex-col gap-y-1 items-center w-full my-8">
          <p className="text-cGreyLit text-[16px] font-inter text-center">
            Payment was made to your account from{" "}
            {notification.from && shortened(notification.from)}
          </p>
          <div className="w-[251px] my-2">
            <hr />
          </div>
          <p className="text-cGrey text-[22px] font-exo font-bold text-center mt-4">
            Amount
          </p>
          <p className="text-cGreyLit text-[16px] font-inter text-center">
            {notification.amount &&
              ethers.utils.formatEther(notification.amount).substring(0, 6)}
          </p>
          <div className="w-[251px] my-4">
            <hr />
          </div>
          <p className="text-cGrey text-[22px] font-exo font-bold text-center mt-4">
            STATUS
          </p>
          {notification.status && notification.status ? (
            <p className="text-[#008000] text-[22px] font-inter text-center font-medium flex items-center justify-center">
              <span>
                <HiCheckCircle color="#008000" size={36} />
              </span>
              SUCCESSFUL
            </p>
          ) : (
            <p className="text-[#ee5858] text-[22px] font-inter text-center font-medium flex items-center justify-center">
              <span>
                <RiCloseCircleFill color="#ee5858" size={36} />
              </span>
              Failed
            </p>
          )}
        </div>
        <PrimaryBtn text="OKAY" onClick={onCloseFunc} />
      </div>
    </Modal>
  );
}
