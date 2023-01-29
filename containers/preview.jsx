import { useEffect, useState } from "react";
import RequestPayment from "./request";
import { TiShoppingCart } from "react-icons/ti";
import { BsCheckLg } from "react-icons/bs";
import PrimaryBtn from "@/components/primaryBtn";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/global-context";
import shortened from "@/lib/shortend";

function PreviewPaymentContainer() {
  const router = useRouter();
  const { to, amount } = router.query;
  const { success, setLoading, setSuccess, getUserBalance, sdk, address } =
    useGlobalContext();
  const [balance, setBalance] = useState("");

  const getMyBal = async () => {
    setLoading((prev) => true);
    const bal = await getUserBalance();
    setBalance((prev) => bal);
    setLoading((prev) => false);
  };

  const confirmPayment = async () => {
    setLoading((prev) => true);
    try {
      if (balance < amount) {
        alert("Insufficient balance");
        setLoading((prev) => false);

        return;
      }

      await sdk.wallet.transfer(to, amount);

      setSuccess((prev) => true);
      setLoading((prev) => false);
    } catch (error) {
      console.log(error);
      alert("Error: " + error.message);
      setLoading((prev) => false);
    }
  };

  useEffect(() => {
    if (address) {
      getMyBal();
    }
  }, [address]);

  return (
    <div className="w-full mt-[120px] bg-cWhiteMix h-full min-h-screen px-4 sm:px-10">
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-8 lg:gap-20 items-center lg:items-start py-8 w-full">
        <div className="w-full flex flex-col items-start">
          <div className="flex flex-col items-center gap-6 mt-10 px-5 py-[50px] bg-secondary shadow-lg rounded-lg w-full">
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
                {amount && amount}
              </p>
            </div>
            {success ? (
              <div className="flex flex-col items-center gap-y-2 mt-[60px]">
                <BsCheckLg color="#fff" size="64" />
                <p
                  className="text-white text-center text-[22px] font-inter cursor-pointer"
                  onClick={() => router.push("/dashboard")}
                >
                  Payment Successful!
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

        <RequestPayment />
      </div>
    </div>
  );
}

export default PreviewPaymentContainer;
