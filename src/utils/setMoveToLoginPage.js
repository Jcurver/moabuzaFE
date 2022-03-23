import { deleteCookie } from './cookie';

export const setMoveToLoginPage = () => {
  deleteCookie('A-AUTH-TOKEN');
  deleteCookie('R-AUTH-TOKEN');
  window.location.href = 'https://moabuza.com/kakaologin';
};
