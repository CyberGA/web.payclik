import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  ChainId,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
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
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const router = useRouter();

  async function checkForAWallet() {
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

  function changeNetwork() {
    if (isMismatched) {
      switchNetwork(ChainId.Goerli);
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

  useEffect(() => {
    changeNetwork();
  }, [address]);

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
