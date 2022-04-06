import { deleteCookie } from './cookie'

export const setMoveToLoginPage = () => {
  deleteCookie('A-AUTH-TOKEN')
  deleteCookie('R-AUTH-TOKEN')
  sessionStorage.clear()
  window.location.href = `${process.env.REACT_APP_BASE_URL}/kakaologin`
}
