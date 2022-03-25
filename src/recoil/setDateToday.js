import { atom } from 'recoil'

export const onedayBuzaDate = atom({
  key: 'setDateToday',
  default: new Date(),
})
