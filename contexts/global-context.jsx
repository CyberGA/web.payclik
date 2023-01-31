import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAddress, useMetamask, useSDK } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import ErrorSnackbar from "@/components/error-snackbar";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const address = useAddress();
  const connect = useMetamask();
  const sdk = useSDK();

  const router = useRouter();

  const connectWallet = async () => {
    if (window.ethereum === undefined) {
      console.error("No ethereum object found");

      setAlertMsg(
        (prev) =>
          "No Ethereum provider found! Please install a wallet extension like MetaMask or use brave browser and setup a wallet"
      );
      setShowAlert(prev => true)
      router.pathname !== "/" && router.push("/");
      return null;
    }
    setLoading((prev) => true);

    try {
      const connectData = await connect();

      if (connectData.data) {
        setWalletConnected((prev) => true);
      }

      const chainID = connectData.data.chain.id;

      if (chainID !== 5) {
        setAlertMsg((prev) => "Please change to Goerli network and refresh");
        setShowAlert((prev) => true);
      }

      setLoading((prev) => false);
    } catch (err) {
      console.error(err.message);
      setAlertMsg((prev) => `Error: ${err.message}`);
      setShowAlert((prev) => true);
      setLoading((prev) => false);
    }
  };

  const getUserBalance = async () => {
    if(address) {
      const userBalance = await sdk?.getBalance(address);
      return userBalance?.displayValue.substring(0, 6);
    }
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
  }, [router.pathname, walletConnected]);

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
      showAlert,
      setShowAlert,
      alertMsg,
      setAlertMsg,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, opened, success, address, walletConnected, showAlert, alertMsg]);

  return (
    <GlobalContext.Provider value={globalValues}>
      <ErrorSnackbar />
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
