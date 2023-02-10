import { createContext, useContext, useMemo, useState } from "react";

const PaymentContext = createContext();

export default function PaymentProvider({ children }) {
  const [opened, setOpened] = useState(false);

  const values = useMemo(() => {
    return {
      opened,
      setOpened
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <PaymentContext.Provider value={values}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  return useContext(PaymentContext);
}
