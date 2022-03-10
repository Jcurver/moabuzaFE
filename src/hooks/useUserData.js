import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useHomeData = (toggle) => {
  return useQuery(['home-data', toggle], request({ url: '/home' }))
}
