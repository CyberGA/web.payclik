import { timeStampToDate } from "@/lib/date";
import { getTimeStamp } from "@/lib/getTransactions";
import shortened from "@/lib/shortend";

export default function Transaction({ address, amount }) {

  
  return (
    <div className="flex flex-col border-b pb-2 ">
      <div className="flex flex-row justify-between">
        <p className="font-bold font-inder text-[18px] text-cGrey">
          {/* To Jhone Doe */}
          {address && shortened(address)}
        </p>
        <p className="text-[14px]">{amount && amount}</p>
      </div>
      {/* <p>{time}</p> */}
    </div>
  );
}
