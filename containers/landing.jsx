import { useEffect } from "react";
import Brand from "@/components/brand";
import PrimaryBtn from "@/components/primaryBtn";
import { useGlobalContext } from "@/contexts/global-context";
import Image from "next/image";
import { useRouter } from "next/router";

export default function LandingContainer() {
  const router = useRouter();
  const { setLoading, getProviderOrSigner, state, dispatch } =
    useGlobalContext();

  async function onContine() {
    setLoading((prev) => true);
    if (state.walletConnected) {
      router.push("/app");
    }
  }
  useEffect(() => {
    return () => {
      setLoading((prev) => false);
    };
  }, []);

  return (
    <div>
      <Brand />
      <div className="flex justify-center items-center h-full w-full px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <Image
            src="/assets/scan.gif"
            width={500}
            height={500}
            blurDataURL="/assets/scan.gif"
            alt="scanning qr"
            priority
          />
          <div className="flex flex-col max-w-[290px] gap-y-8">
            <h1 className="text-[32px] font-semibold font-inter">
              Transactions that are fast and easy.
            </h1>
            <PrimaryBtn text="Continue" onClick={onContine}></PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
