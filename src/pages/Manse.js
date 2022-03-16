import React, { useEffect } from 'react'
import { apis } from '../utils/axios'


function Manse() {
  useEffect(() => {
    async function manse() {
      const { data } = await apis.getPostButton()
      console.log('넘어온 데이터 : ', data)
    }
    manse()
  },[])
}
export default Manse
