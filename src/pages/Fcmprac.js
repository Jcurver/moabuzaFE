import React, { Suspense, lazy, useState, useEffect } from 'react'

import '../utils/fcm'
import axios from 'axios'
import { fcmToken } from '../utils/ec2'


function Fcmprac() {
  const bob = 'bog'
  function memberinfo() {
    axios.post(`https://panghoon.shop/member/info`)

  }
  function pushnoti() {
    axios.post(`https://panghoon.shop/push`, {
      nickname: 'pangpang',
    })

  }
  function ho() {
    axios.post(`https://panghoon.shop/ho`, {
      nickname: 'bog',
      token: fcmToken,
    })
  }

  return (
    <div>
      <button
        type="button"
        style={{ padding: '20px', marginLeft: '20px' }}
        onClick={() => memberinfo()}
      >
        member/info
      </button>
      <button
        type="button"
        style={{ padding: '20px', marginLeft: '20px' }}
        onClick={() => pushnoti(bob)}
      >
        push/noti
      </button>
      <button
        type="button"
        style={{ padding: '20px', marginLeft: '20px' }}
        onClick={() => ho()}
      >
        ho
      </button>
    </div>
  )
}

export default Fcmprac
