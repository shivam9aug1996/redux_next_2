
import CartClient from '@/components/Cart/CartClient'
import CartClient2 from '@/components/Cart/CartClient2'
import React, { Suspense } from 'react'

export const metadata = {
  title: 'FastBuy Cart',
  description: 'FastBuy Cart',
}

const Cart = () => {
  return (
    <div style={{flex:1}}>
      {/* <CartClient/> */}
      <CartClient/>
  </div>
  )
}

export default Cart