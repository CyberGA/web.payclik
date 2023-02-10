import { TiShoppingCart } from "react-icons/ti";
import { BsCheckLg } from "react-icons/bs";
import PrimaryBtn from "@/components/primaryBtn";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/global-context";
import shortened from "@/lib/shortend";
import {
  ConnectWallet,
  useAddress,
  useBalance,
  useContract,
} from "@thirdweb-dev/react";
import { PAYCLIK_CONTRACT_ADDRESS } from "@/lib/constants";
import { ethers } from "ethers";
import PaymentResult from "./paymentResult";

function PreviewPaymentContainer() {
  const { contract } = useContract(PAYCLIK_CONTRACT_ADDRESS);

  const router = useRouter();
  const userBalance = useBalance();
  const address = useAddress();
  const { to, amount } = router.query;
  const { success, setLoading, setSuccess, setAlertMsg, setShowAlert } =
    useGlobalContext();

  const confirmPayment = async () => {
    if (!address) {
      setAlertMsg((prev) => "Connect your wallet");
      setShowAlert((prev) => true);
      return;
    }

    if (!contract) {
      return;
    }

    setLoading((prev) => true);
    if (Number.parseFloat(userBalance.data.displayValue) < amount) {
      setAlertMsg((prev) => "Insufficient balance");
      setShowAlert((prev) => true);
      setLoading((prev) => false);
      return;
    }

    // Call contract to get balance
    // await sdk.wallet.transfer(to, amount); // thirdweb sdk
    const amt = ethers.utils.parseEther(amount);

    contract
      .call("sendEther", to, amt, {
        value: amt,
      })
      .then((res) => {
        console.info("contract call successs", res);
        setSuccess((prev) => true);
        setLoading((prev) => false);
      })
      .catch((err) => {
        let msg = err.message;
        console.error("contract call failure", err);
        if (err.message.includes("user rejected transaction")) {
          msg = "Transaction rejected";
        }
        if (msg.length > 80) {
          msg = "An error has occurred";
        }
        setAlertMsg((prev) => msg);
        setShowAlert((prev) => true);
        setLoading((prev) => false);
      });
  };

  return (
    <div className="w-full mt-[120px] bg-cWhiteMix h-full min-h-screen px-4 sm:px-10 pt-10">
      <PaymentResult />
      <div className="block sm:hidden w-fit mx-auto">
        <ConnectWallet className="connect " />
      </div>
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-8 lg:gap-20 items-center lg:items-start py-8 w-full">
        <div className="w-full flex flex-col items-start">
          <div className="flex flex-col items-center gap-6 mt-5 px-5 py-[50px] bg-secondary shadow-lg rounded-lg w-full">
            <div>
              <TiShoppingCart color="#fff" size="140" />
            </div>
            <div>
              <p className="text-white text-center text-[22px] font-inter font-medium">
                You are paying to
              </p>
              <p className="text-white text-center text-[33px] font-inter font-bold">
                {to && shortened(to)}
              </p>
            </div>
            <div className="w-[251px] my-[46px]">
              <hr />
            </div>
            <div>
              <p className="text-white text-center text-[22px] font-inter font-medium">
                Amount
              </p>
              <p className="text-white text-center text-[33px] font-inter font-bold">
                {amount && amount + "ETH"}
              </p>
            </div>

            {success ? (
              <div className="flex flex-col items-center gap-y-2 mt-[60px]">
                <BsCheckLg color="#fff" size="64" />
                <p
                  className="text-white text-center text-[20px] font-inter cursor-pointer underline underline-offset-2"
                  onClick={() => router.push("/app")}
                >
                  Go to Dashboard
                </p>
              </div>
            ) : (
              <div className="mt-[60px]">
                <p
                  className="text-white text-center text-[22px] font-inter cursor-pointer"
                  onClick={() => router.push("/app")}
                >
                  Cancel
                </p>
                <PrimaryBtn
                  text="Confirm"
                  bg="bg-white"
                  sx="text-secondary w-[245px] rounded-full mt-8"
                  onClick={confirmPayment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPaymentContainer;
