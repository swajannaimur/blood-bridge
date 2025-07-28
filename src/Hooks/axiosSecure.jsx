import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Components/Contexts/AuthContext";
import Loader from "../Components/Loader/Loader";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000/'
})

const useAxiosSecure = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <Loader />
  }

  axiosSecure.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${user.accessToken}`
    return config
  }, error => {
    return Promise.reject(error)
  })

  return axiosSecure
}

export default useAxiosSecure;