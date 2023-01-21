import Brand from "@/components/brand";
import CInput from "@/components/input";
import PrimaryBtn from "@/components/primaryBtn";
import { useRouter } from "next/router";

export default function CreateUserContainer() {
  const router = useRouter()

  return (
    <div>
      <Brand />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center gap-y-10 items-center mt-[60px] max-w-[480px] w-full bg-secondary rounded-xl py-20 px-10 shadow-[0_0_20px_-2px_rgba(0,0,0,0.3)] my-2">
          <h1 className="text-[24px] font-exo font-bold text-white">
            Create Username
          </h1>
          <CInput type="text" placeholder="CyberGA" />
          <PrimaryBtn
            bg="bg-white"
            text="Create"
            sx="text-secondary text-[44px]"
            onClick={() => router.push("/dashboard")}
          />
        </div>
      </div>
    </div>
  );
}
