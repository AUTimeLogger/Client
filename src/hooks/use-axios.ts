import { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function interceptRequests(session: any, axiosInstance: any) {
  const token = sessionStorage.getItem("aut-time-logger-token");

  axiosInstance.interceptors.request.use((config: any) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = session
      ? "Bearer " + token
      : "not authenticated";
    return newConfig;
  });
}

export default function useAxios() {
  const axiosInstance = axios.create({ baseURL: "/api" });
  const { data: session } = useSession();

  useEffect(() => {
    interceptRequests(session, axiosInstance);
  }, [session]);

  interceptRequests(session, axiosInstance);

  return axiosInstance;
}
