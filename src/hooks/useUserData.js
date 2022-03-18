import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useHomeData = (toggle, onSuccess, onError) => {
  return useQuery(
    ['home-data', toggle],
    () => { return request({ url: '/home', method: 'get' }); },
    onSuccess,
    onError,
  )
}
