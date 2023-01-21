import Brand from "@/components/brand";
import Metamask from "@/components/metamask";
import PrimaryBtn from "@/components/primaryBtn";
import { useGlobalContext } from "@/contexts/global-context";
import { StoreAction } from "@/hooks/store";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LandingContainer() {
  const router = useRouter();
  const {
    setWalletConnected,
    setLoading,
    getProviderOrSigner,
    initiate,
    dispatch,
  } = useGlobalContext();

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    setLoading((prev) => true);

    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected((prev) => true);
    } catch (err) {
      console.error(err);
    }

    setLoading((prev) => false);
  };

  async function entry() {
    setLoading((prev) => true);
    const appConnected = localStorage.getItem("isConnected");
    if (appConnected) {
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      console.log(address)
      dispatch({
        type: StoreAction.SAVE_ACCOUT,
        payload: {
          address,
        },
      });
      router.push("/dashboard");
    }
  }

  useEffect(() => {
    initiate();
    entry();
    return () => {
      setLoading((prev) => false);
    };
  }, []);

  return (
    <div>
      <Brand />
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-rows gap-x-12 items-center">
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
            <PrimaryBtn text="Connect Wallet" onClick={connectWallet}>
              <Metamask />
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
