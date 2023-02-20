import { Modal, TextInput } from "@mantine/core";
import { SiEthereum } from "react-icons/si";
import QRCode from "react-qr-code";
import { useGlobalContext } from "@/contexts/global-context";
import PrimaryBtn from "@/components/primaryBtn";
import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { CopyButton, Button } from "@mantine/core";

export default function RequestPayment() {
  const address = useAddress();
  const { opened, setOpened, setAlertMsg, setShowAlert } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState("");

  const generateQR = () => {
    if (amount.length == 0 || amount == "0" || amount.includes("-")) {
      setAlertMsg((prev) => "Invalid amount");
      setShowAlert((prev) => true);
      return;
    }

    if (address) {
      const link = `${window.location.origin}/preview?to=${address}&amount=${amount}`;
      setValue((prev) => link);
      setShow((prev) => true);
    }
  };

  function onChangeFunc(e, setState) {
    setShow((prev) => false);
    setState(e.currentTarget.value.toString());
  }

  function onCloseFunc() {
    setAmount("");
    setShow((prev) => false);
    setOpened(false);
  }

  return (
    <Modal opened={opened} onClose={onCloseFunc} size="md" overflow="outside">
      <div className="pb-20">
        <p className="text-cGrey text-[22px] font-exo font-bold text-center">
          Receive Payment
        </p>
        <div className="flex flex-col gap-y-1 items-start w-full my-8">
          <p className="text-cGreyLit text-[16px] font-inter text-center">
            Amount
          </p>
          <TextInput
            placeholder="0.0145ETH"
            type="number"
            icon={<SiEthereum size={16} color="#666" />}
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
          <>
            <div className="flex justify-center items-center border px-4 py-10 mt-9">
              <QRCode
                size={50}
                style={{ height: "auto", maxWidth: "200px", width: "100%" }}
                value={value}
                viewBox={`0 0 50 50`}
              />
            </div>
            <div className="flex justify-center items-center pt-10">
              <div className="bg-[#1A1B1E] rounded">
                <CopyButton value={value} timeout={2500}>
                  {({ copied, copy }) => (
                    <Button color="dark" onClick={copy}>
                      {copied ? "Copied payment url" : "Copy url"}
                    </Button>
                  )}
                </CopyButton>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
