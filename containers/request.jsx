import { Modal, TextInput } from "@mantine/core";
import { SiEthereum } from "react-icons/si";
import { HiShoppingCart } from "react-icons/hi";
import QRCode from "react-qr-code";
import { useGlobalContext } from "@/contexts/global-context";
import PrimaryBtn from "@/components/primaryBtn";
import { useState } from "react";

export default function RequestPayment() {
  const { opened, setOpened } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState("");

  const generateQR = () => {
    if (purpose.length == 0 || amount.length == 0) return;

    const values = { purpose, amount };
    setValue((prev) => JSON.stringify({ purpose, amount }));
    setShow((prev) => true);
  };

  function onChangeFunc(e, setState) {
    setShow((prev) => false);
    setState(e.currentTarget.value.toString());
  }

  function onCloseFunc() {
    setAmount("");
    setPurpose("");
    setShow((prev) => false);
    setOpened(false);
  }

  return (
    <Modal
      opened={opened}
      onClose={onCloseFunc}
      size="md"
      overflow="outside"
    >
      <div className="pb-20">
        <p className="text-cGrey text-[22px] font-exo font-bold text-center">
          Receive Payment
        </p>

        <div className="flex flex-col gap-y-1 items-start w-full mt-8">
          <p className="text-cGrey text-[16px] font-inter text-center">
            Payment Purpose
          </p>
          <TextInput
            placeholder="Ex: Groceries"
            type="text"
            icon={<HiShoppingCart size={16} color="#666" />}
            className="h-[60px] w-full "
            size="lg"
            labelProps={{ color: "#666666" }}
            required
            value={purpose}
            onChange={(e) => onChangeFunc(e, setPurpose)}
          />
        </div>
        <div className="flex flex-col gap-y-1 items-start w-full my-8">
          <p className="text-cGreyLit text-[16px] font-inter text-center">
            Amount
          </p>
          <TextInput
            placeholder="0.0145"
            type="number"
            icon={<SiEthereum size={16} color="#66" />}
            className="h-[60px] w-full "
            size="lg"
            labelProps={{ color: "#666666" }}
            required
            value={amount}
            onChange={(e) => onChangeFunc(e, setAmount)}
          />
        </div>
        <PrimaryBtn text="Generate QR Code" onClick={generateQR} />

        {show ? (
          <div className="flex justify-center items-center border px-4 py-10 mt-9">
            <QRCode
              size={50}
              style={{ height: "auto", maxWidth: "200px", width: "100%" }}
              value={value}
              viewBox={`0 0 50 50`}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
