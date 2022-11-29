import { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function interceptRequests(session: any, axiosInstance: any) {
  const token = sessionStorage.getItem("aut-time-logger-token");

  axiosInstance.interceptors.request.use((config: any) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${token}`;
    newConfig.headers["Content-Type"] = "application/json";
    return newConfig;
  });
}

export default function useAxios() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  const { data: session } = useSession();

  useEffect(() => {
    interceptRequests(session, axiosInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  interceptRequests(session, axiosInstance);

  return axiosInstance;
}
