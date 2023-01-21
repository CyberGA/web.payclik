import RequestPayment from "./request";
import Menu from "@/components/menu";
import { TiShoppingCart } from "react-icons/ti"
import { BsCheckLg } from "react-icons/bs";
import PrimaryBtn from "@/components/primaryBtn";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/global-context";


function PreviewPaymentContainer() {
    const router = useRouter()
    const { success, setLoading, setSuccess } = useGlobalContext()
    
    const confirmPayment = () => {
        setLoading(prev => true)
       Promise.all([
         setTimeout(() => {
           setLoading((prev) => false);
         }, 2000),
       ]).then(() => {
           setTimeout(() => {setSuccess((prev) => true);}, 2000)

       });
    }

  return (
    <div className="w-full mt-[120px] bg-cWhiteMix h-screen">
      <div className="mx-auto  flex flex-row gap-20 items-start py-8 px-[10] dashboard">
        <Menu />
        <div className="w-full flex flex-col items-start pt-10">
          <div className="flex flex-col items-center gap-6 mt-10 px-5 py-[50px] bg-secondary shadow-lg rounded-lg w-full">
            <div>
              <TiShoppingCart color="#fff" size="140" />
            </div>
            <div>
              <p className="text-white text-center text-[22px] font-inter font-medium">
                You are paying to
              </p>
              <p className="text-white text-center text-[33px] font-inter font-bold">
                CyberGA
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
                0.00245ETH
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
                  onClick={() => router.push("/dashboard")}
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
