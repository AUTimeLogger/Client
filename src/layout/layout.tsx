import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import usePersistToken from "@/hooks/use-persist-token";
import LoadingContent from "../components/contents/loading-content";
import UnauthorizedContent from "../components/contents/unauthorized-content";
import Drawer from "./drawer";

type LayoutProps = {
  children?: React.ReactNode;
};

const getIdentity = async () => {
  return fetch("/api/me").then((res) => res.json());
};

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  console.log(session);
  usePersistToken();
  const router = useRouter();

  const { isLoading, data: identity } = useQuery(["identity"], getIdentity);

  if (!session) return <UnauthorizedContent />;
  if (isLoading) return <LoadingContent />;
  if (router.pathname !== "/" && !identity.isAdmin)
    return <UnauthorizedContent />;

  return <Drawer>{children}</Drawer>;
}