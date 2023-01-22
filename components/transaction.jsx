import shortened from "@/lib/shortend";

export default function Transaction() {
  return (
    <div className="flex flex-col border-b pb-2 ">
      <div className="flex flex-row justify-between">
        <p className="font-bold font-inder text-[18px] text-cGrey">
          {/* To Jhone Doe */}
          {shortened("0xedCdA4D74003DBcF5A4A8ABc6b2c35F09a6d352c")}
        </p>
        <p>0.005</p>
      </div>
      <p>12 June 2022 at 03:00 pm</p>
    </div>
  );
}
