import OrderClient from '@/components/Order/OrderClient'
import React from 'react'
export const metadata = {
  title: 'FastBuy Order History',
  description: 'FastBuy Order History',
}

const Order = () => {
  return (
    <div style={{flex:1}}>
   <OrderClient/>
   </div>
  )
}

export default Order