import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const useFriendsData = (navigate) => {
  return useQuery(['friend', navigate], () => {
    return request({ url: '/friend', method: 'get' })
  })
}