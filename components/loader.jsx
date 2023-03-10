import { Loader } from "@mantine/core";

const AppLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <Loader color="indigo" />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        Please wait...
      </p>
    </div>
  );
};

export default AppLoader;
