import Brand from "@/components/brand";
import shortened from "@/lib/shortend";
import { useRouter } from "next/router";
import { TbCopy } from "react-icons/tb";
import { SiEthereum } from "react-icons/si";
import { useGlobalContext } from "@/contexts/global-context";
import { Loader } from "@mantine/core";

export default function HeaderContainer() {
  const router = useRouter();
  const { state } = useGlobalContext();

  function copyAddr() {
    navigator.clipboard.writeText(state.address);
  }

  return (
    <>
      {router.pathname == "/" || router.pathname == "/create-user" ? (
        <></>
      ) : (
        <nav className="w-full bg-secondary fixed top-0">
          <div className="flex flex-row w-full h-[120px] border-b justify-between px-[6vw]">
            <Brand
              isHome={false}
              color="#fff"
              sx="text-white"
              bsx="my-0 px-0 "
            />

            <div
              className="hidden md:flex flex-row gap-x-8 items-center text-white font-inder font-medium text-lg"
              onClick={copyAddr}
            >
              {state.address.length == 0 ? (
                <Loader color="indigo" />
              ) : (
                <div className="flex flex-row items-center justify-center gap-x-1 rounded-lg border-[2px] px-4 py-2 shadow-lg cursor-pointer bg-secondary/30">
                  <SiEthereum size={16} color="#66" />
                  <p>{shortened(state.address)}</p>
                  <TbCopy size="16" />
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
