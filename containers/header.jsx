import Brand from "@/components/brand";
import { useRouter } from "next/router";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function HeaderContainer() {
  const router = useRouter();

  return (
    <>
        <nav className="w-full bg-secondary fixed top-0 z-[99]">
          <div className="flex flex-row w-full h-[120px] border-b items-center justify-between px-[6vw]">
            <Brand
              isHome={ router.pathname == "/" ? true : false}
              color="#fff"
              sx="text-white"
              bsx="my-0 px-0 "
            />

            <div className="hidden sm:block">
              <ConnectWallet className="connect" />
            </div>
          </div>
        </nav>
    </>
  );
}
