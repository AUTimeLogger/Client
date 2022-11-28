import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function usePersistToken() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.autToken)
      sessionStorage.setItem("aut-time-logger-token", session?.autToken);
  }, [session]);
}
