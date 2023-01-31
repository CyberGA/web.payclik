import Brand from "@/components/brand";
import shortened from "@/lib/shortend";
import { useRouter } from "next/router";
import { TbCopy, TbCheck } from "react-icons/tb";
import { SiEthereum } from "react-icons/si";
import { useGlobalContext } from "@/contexts/global-context";
import {
  Loader,
  CopyButton,
  ActionIcon,
  Tooltip,
  Skeleton,
} from "@mantine/core";

export default function HeaderContainer() {
  const router = useRouter();
  const { address } = useGlobalContext();

  function copyAddr() {
    navigator.clipboard.writeText(address);
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
              <Skeleton visible={address?.length == 0}>
                {address?.length == 0 ? (
                  <Loader color="indigo" />
                ) : (
                  <div className="flex flex-row items-center justify-center gap-x-1 rounded-lg border-[2px] px-4 py-2 shadow-lg cursor-pointer bg-secondary/30">
                    <SiEthereum size={16} color="#66" />
                    <p>{address && shortened(address)}</p>
                    <CopyButton value={address} timeout={2000}>
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied" : "Copy"}
                          withArrow
                          position="right"
                        >
                          <ActionIcon
                            color={copied ? "teal" : "gray"}
                            onClick={copy}
                          >
                            {copied ? (
                              <TbCheck size={16} />
                            ) : (
                              <TbCopy size={16} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </div>
                )}
              </Skeleton>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
