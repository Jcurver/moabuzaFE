// import Cookies from 'react-cookie'

// const cookies = new Cookies()

// export const setCookie = (name, value) => {
//   return cookies.set(name, value)
// }
// export const getCookie = (name) => {
//   return cookies.get(name)
// }

// export const removeCookie = (name) => {
//   return cookies.remove(name)
// }
// 키값 기준으로 쿠키에 저장된 값을 가져오는 함수
const getCookie = (name) => {
  
  // 쿠키 값을 가져옵니다.
  const value = `; ${  document.cookie}`;
  // 키 값을 기준으로 파싱합니다.

  const parts = value.split(`; ${  name  }=`);
  // value를 return!
  if (parts.length === 2) {
		return parts[0].toString().split(";").shift();
  }
  return null
};

// 쿠키에 저장하는 함수
const setCookie = (name, value, exp = 5) => {
  const date = new Date();
  // 날짜를 만들어줍니다.
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // 저장!
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

// 만료일을 예전으로 설정해 쿠키를 지웁니다.
const deleteCookie = (name) => {
  const date = new Date()
  date.setDate(date.getDate() - 1);
  document.cookie = `${name}=;expires=${date.toUTCString()};path=/`;
  // document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}



export { getCookie, setCookie, deleteCookie };