import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import ErrorSnackbar from "@/components/error-snackbar";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const address = useAddress();

  const router = useRouter();

  async function checkForAWallet() {
    if (window.ethereum === undefined) {
      console.error("No ethereum object found");

      setAlertMsg(
        (prev) =>
          "No Ethereum provider found! Please install a wallet extension like MetaMask or use brave browser and setup a wallet"
      );
      setShowAlert((prev) => true);
      router.pathname !== "/" && router.push("/");
      return null;
    }

    if (!address) {
      if (router.pathname == "/" || router.pathname.startsWith("/preview")) {
        return;
      }
      setAlertMsg((prev) => "Please connect your wallet");
      setShowAlert((prev) => true);
      router.pathname !== "/" &&
        !router.pathname.startsWith("/preview") &&
        router.push("/");
      return null;
    }
  }

  useEffect(() => {
    let isMounted = true;

    checkForAWallet();

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
      address,
      showAlert,
      setShowAlert,
      alertMsg,
      setAlertMsg,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, opened, success, address, showAlert, alertMsg]);

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
