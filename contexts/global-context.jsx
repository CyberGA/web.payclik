import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAddress, useMetamask, useSDK } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [success, setSuccess] = useState(false);

  const address = useAddress();
  const connect = useMetamask();
  const sdk = useSDK();

  const router = useRouter();

  const connectWallet = async () => {
    setLoading((prev) => true);

    try {
      await connect();

      setLoading((prev) => false);
    } catch (err) {
      console.error(err.message);
      setLoading((prev) => false);
    }

    setLoading((prev) => false);
  };

  const getUserBalance = async () => {
    const userBalance = await sdk?.getBalance(address);
    return userBalance?.displayValue.substring(0, 6);
  };

  async function init() {
    await connectWallet();
    await getUserBalance();
  }

  useEffect(() => {
    let isMounted = true;

    init();

    return () => {
      isMounted = false;
      setLoading((prev) => false);
    };
  }, [router.pathname]);

  const globalValues = useMemo(() => {
    return {
      loading,
      setLoading,
      opened,
      setOpened,
      success,
      setSuccess,
      connect,
      address,
      getUserBalance,
      sdk,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, opened, success, address]);

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
