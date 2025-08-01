import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://blood-bridge-server-side.vercel.app",
  });

  return instance;
};

export default useAxiosPublic;