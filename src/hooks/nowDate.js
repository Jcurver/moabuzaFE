import { getItem } from '../utils/sessionStorage'

export function nowDate() {
  if (getItem('nowdate') !== null) return getItem('nowdate')
  return new Date()
}
