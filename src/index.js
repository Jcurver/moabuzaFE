/* eslint-disable func-names */
import React, { Component } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import App from './pages/App'
import DeviceDetect from './DeviceDetect'

import reportWebVitals from './reportWebVitals'
import GlobalStyle from './styles/GlobalStyle'

const queryClient = new QueryClient()
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./service-worker.js')
    // .then(
    //   function (registration) {
    //     console.log('Worker registration successful', registration.scope);
    //   },
    //   function (err) {
    //     console.log('Worker registration failed', err);
    //   },
    // )
    // .catch(function (err) {
    //   console.log(err);
    // });
  })
} else {
  console.log('Service Worker is not supported by browser.')
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../public/firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err)
    })
}

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Router>
          <GlobalStyle />
          <DeviceDetect>
            <App />
          </DeviceDetect>
        </Router>
      </CookiesProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById('root'),
)
// serviceWorkerRegistration.register()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
