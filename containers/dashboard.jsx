import RequestPayment from "./request";
import Menu from "@/components/menu";
import TransactionsContainer from "./transactions";
import { VscChromeClose } from "react-icons/vsc";
import PaymentResult from "./paymentResult";

export default function DashboardContainer() {

  return (
    <div className="w-full mt-[120px] bg-cWhiteMix h-full min-h-screen px-4 sm:px-10">
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-8 lg:gap-20 justify-center items-center lg:items-start py-8 w-full">
        <Menu />
        <TransactionsContainer />

        <RequestPayment />
        <PaymentResult />
      </div>
    </div>
  );
}
