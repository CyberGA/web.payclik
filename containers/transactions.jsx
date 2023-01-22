import Transaction from "@/components/transaction";
import { useGlobalContext } from "@/contexts/global-context";
import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TransactionsContainer() {
  const [activePage, setPage] = useState(1);
  const { getProviderOrSigner, refreshWallet, state } = useGlobalContext();

  async function getTransactions() {
    try {
      const signer = await getProviderOrSigner(true);

      const count = await signer.getTransactionCount();
      console.log(count);
      let allTransactions = [];
      for (let i = 0; i < count; i += 20) {
        const blockTransactions = await signer.getTransactions(i, i + 20);
        allTransactions = allTransactions.concat(blockTransactions);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    refreshWallet();
    getTransactions();

    return () => {};
  }, []);

  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex flex-col gap-6 mt-10 p-5 bg-white shadow-lg rounded-lg w-full">
        <p className="text-cGrey text-[22px] font-exo font-bold">
          Transactions
        </p>
        <div className="flex flex-col gap-8 ">
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />

          <div className="flex justify-center items-center my-10">
            <Pagination
              page={activePage}
              onChange={setPage}
              total={10}
              color="indigo.3"
              variant="light"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
