import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Components/Contexts/AuthContext";
import Loader from "../Components/Loader/Loader";

const axiosSecure = axios.create({
  baseURL: 'https://blood-bridge-server-side.vercel.app/'
})

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (user) {
      axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config
      }, error => {
        return Promise.reject(error)
      })

    }
  }, [user])


  return axiosSecure
}

export default useAxiosSecure;