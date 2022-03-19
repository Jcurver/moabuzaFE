import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useHomeData = (toggle, navigate, onSuccess, onError) => {
  return useQuery(

    ['home-data',navigate, toggle],
    () => { return request({ url: '/home', method: 'get' }); },

    onSuccess,
    onError,
  )
}
