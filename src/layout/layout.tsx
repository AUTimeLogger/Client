import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxios from "@/hooks/use-axios";
import usePersistToken from "@/hooks/use-persist-token";
import LoadingContent from "../components/contents/loading-content";
import UnauthorizedContent from "../components/contents/unauthorized-content";
import Drawer from "./drawer";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const axios = useAxios();
  const { data: session } = useSession();

  usePersistToken();
  const router = useRouter();

  const getIdentity = async () => {
    return axios
      .get("/me", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "aut-time-logger-token"
          )}`,
        },
      })
      .then((res) => res.data);
  };

  const { isLoading, data: identity } = useQuery(["identity"], getIdentity, {
    retry: 1,
    enabled: !!session,
  });

  // if (!sessionStorage.getItem("aut-time-logger-token"))
  //   return <UnauthorizedContent />;
  // if (isLoading) return <LoadingContent />;
  if (router.pathname !== "/" && !identity?.isAdmin)
    return <UnauthorizedContent />;

  return <Drawer>{children}</Drawer>;
}
