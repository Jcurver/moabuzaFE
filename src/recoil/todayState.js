import { atom } from 'recoil'
import { getDate } from '../hooks/getDate';

const today = getDate()

export const selectDate = atom({
  key: 'selectDate',
  default: 0,
})
