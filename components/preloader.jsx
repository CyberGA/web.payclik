import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/global-context";

export default function PreLoader({ children }) {
  const { loading, setLoading } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const startLoader = async (url, { shallow }) => {
      isMounted && setLoading((prev) => true);
      window.scroll(0, 0);
    };

    const stopLoader = (url, { shallow }) => {
      isMounted && setLoading((prev) => false);
    };

    router.events.on("routeChangeStart", startLoader);

    router.events.on("routeChangeComplete", stopLoader);

    return () => {
      isMounted = false;
      router.events.off("routeChangeStart", startLoader);
      router.events.off("routeChangeComplete", stopLoader);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <>
      <LoadingOverlay
        visible={loading}
        overlayBlur={2}
        loaderProps={{ size: "xl", color: "#6933D5", variant: "bars" }}
        overlayOpacity={0.8}
        overlayColor="#000"
      />
      {children}
    </>
  );
}
