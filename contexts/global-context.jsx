import {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
  useReducer,
} from "react";
import { providers } from "ethers";
import { useLocalStorage } from "@mantine/hooks";
import Web3Modal from "web3modal";
import {initState, StoreReducer, StoreAction } from "@/hooks/store";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [success, setSuccess] = useState(false);
  const [state, dispatch] = useReducer(StoreReducer, initState);
  const [walletConnected, setWalletConnected] = useLocalStorage({
    key: "isConnected",
    defaultValue: false,
  });

  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  async function initiate() {
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        cacheProvider: true,
        disableInjectedProvider: false,
      });
    }

    dispatch({
        type: StoreAction.INIT_ACCOUNT,
        payload: {
          web3ModalRef
        },
      });

    }

  useEffect(() => {
    initiate();
  }, []);

  const globalValues = useMemo(() => {
    return {
      loading,
      setLoading,
      opened,
      setOpened,
      success,
      setSuccess,
      walletConnected,
      setWalletConnected,
      getProviderOrSigner,
      web3ModalRef,
      initiate,
      state,
      dispatch,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, opened, success, walletConnected]);

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
