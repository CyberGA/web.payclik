import Image from "next/image";
import { useRouter } from "next/router";
import PrimaryBtn from "@/components/primaryBtn";


function NotFoundContainer() {
    const router = useRouter()
  return (
    <div className="w-full mt-[120px] bg-cWhite h-full min-h-screen px-4 sm:px-10">
      <div className="mx-auto max-w-[700px] flex flex-col gap-8 lg:gap-20 justify-center items-center py-8 w-full">
        <Image
          src="/assets/not-found.png"
          width={700}
          height={400}
          blurDataURL="/assets/not-found.png"
          alt="Not found image"
        />
        <h1 className="text-[24px] md:text-[48px] font-exo font-medium">
          Opps! Page not found
        </h1>

        <PrimaryBtn
          text="Go to App"
          onClick={() => router.push("/app")}
          sx="max-w-[180px] md:max-w-[540px]"
        />
      </div>
    </div>
  );
}

export default NotFoundContainer;
