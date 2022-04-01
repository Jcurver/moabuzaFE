import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { isMobile } from 'react-device-detect'

import '../assets/fonts/font.css'

const GlobalStyle = createGlobalStyle`
  ${reset};
  :root {
    --color-white: #ffffff;
    --color-primary: #f8f8f8;
    --color-primary-deemed: rgba(248, 248, 248, 0.5);
    --color-danger: #ef2f68;
    --color-login-bg: #27173f;
    --color-kakao: #fee500;
    --color-naver: #03c75a;
    --color-progressbar: #f0f0f0;
    --color-layout: #eeeeee;
    --color-yellow: #fcec57;
    --color-title: #333333;
    --color-grey01: #131313;
    --color-deemed: #999999;
    --color-main: #7057fc;
    --color-subtext2: #868686;
    --color-deemed2: #e8e8e8;
    --color-detail: #f7f5ff;
    --color-statistics: #492cf1;
    --color-onboard: #7d3bff;
    --font-name-apple: 'Apple SD Gothic Neo';
    --font-maximum: 48px;
    --font-xxxxl: 44px;
    --font-xxxl: 28px;
    --font-xxl: 24px;
    --font-xl: 20px;
    --font-l: 18px;
    --font-m: 16px;
    --font-s: 15px;
    --font-xs: 14px;
    --font-xxs: 12px;
    --weight-heavy-bold: 900;
    --weight-extra-bold: 800;
    --weight-bold: 700;
    --weight-semi-bold: 600;
    --weight-regular: 500;
    --weight-semi-regular: 400;
    --weight-light: 300;
    --weight-extraLight: 200;
    --border-radius-semi: 4px;
    --border-radius-small: 6px;
    --border-radius-monsterItem: 2px;
    --border-radius-progress: 10px;
    --border-radius-checkBtn: 20px;
    --border-radius-mideum: 12px;
    --animation-duration: 200ms;
    --bg-wrapper: #070707;
    --bg-wrapper-gradient: linear-gradient(0deg, #070707, #070707);
    --bg-primary: #EBF2FF;
    --bg-disabled: #181819;
    --bg-active: #3b0a9d;
    --bg-selected: #1c0054;
    --bg-selected-light: #7d3cff;
    --bg-done: #000000;
    --bg-nope: #303236;
    --bg-toast: #C5BEF4;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html, body {
      overscroll-behavior-y: contain;
      margin: 0px;
      padding: 0px;
    }
    html {
      position: fixed;
      width: 100vw;
      height: 100vh;
      height: -webkit-fill-available;
      overflow: hidden;
    }
    body {
      width:100%;
      height: 100%;
      /* height: calc(var(--vh, 1vh) * 100); */
      overflow: hidden;
      min-height: 100vh;
      height: -webkit-fill-available;
      /* min-height: -webkit-fill-available; */

      font-family: 'Noto Sans KR';
      -ms-overflow-style: none;

      li {
      list-style: none;
      }
      body::-webkit-scrollbar {
	display:none; /* Chrome , Safari , Opera */
  width: 0 !important;
}
  button {
    border:none;
    cursor:pointer;
  }
  input {
    border:none;
  }
  input:focus {
    outline:none;
  }
  div {
    white-space: nowrap;
  }
  .swal2-confirm.swal2-styled{
    width: 95px;
    height: 41px;
    background-color: #4675F0 !important;
    border-radius: 8px;
  }

  .swal2-title{
    margin-top:10px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height */

    letter-spacing: -0.04em;

    color: #000000;
  }
  .swal2-html-container{
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.04em;

    /* color/text/Color-text-Gray3 */

    color: #60666F;
  }
  .swal2-styled.swal2-cancel {

    width: 95px;
    height: 41px;
    background-color: #F5F5F7 !important;
    border-radius: 8px;
    
    /* Button / Noto Sans KR / Btn_Md */

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    /* identical to box height, or 14px */


    /* color / text / Color-text-Gray2 */

    color: #8C939D;
  }
  .swal2-image{
    margin: 2em auto 0;
  }

}

`

export default GlobalStyle
