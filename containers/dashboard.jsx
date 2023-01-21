import Transaction from "@/components/transaction";
import { Pagination } from "@mantine/core";
import { useState } from "react";
import RequestPayment from "./request";
import Menu from "@/components/menu";

export default function DashboardContainer() {
  const [activePage, setPage] = useState(1);

  return (
    <div className="w-full mt-[120px] bg-cWhiteMix h-screen">
      <div className="mx-auto  flex flex-row gap-20 items-start py-8 px-[10] dashboard">
        <Menu />
        <div className="w-full flex flex-col items-start pt-10">
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

        <RequestPayment />
      </div>
    </div>
  );
}
