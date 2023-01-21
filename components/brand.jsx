import Logo from "@/components/logo";
import { useRouter } from "next/router";

export default function Brand({ color = "#6933D5", isHome = true, sx, bsx }) {
  const router = useRouter();

  return (
    <div
      className={`flex flex-row items-center px-[10vw] my-14 cursor-pointer ${bsx}`}
      onClick={() => (isHome ? router.push("/") : router.push("/dashboard"))}
    >
      <Logo color={color} width="90" height="88" />
      <p className={`text-[44px] text-cGrey font-exo font-bold ${sx}`}>
        PayClik
      </p>
    </div>
  );
}
