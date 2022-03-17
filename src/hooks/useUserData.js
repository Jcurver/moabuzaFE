import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useHomeData = (toggle, onSuccess, onError) => {
  return useQuery(
    ['home-data', toggle],
    request({ url: '/home' }),
    onSuccess,
    onError,
  )
}
