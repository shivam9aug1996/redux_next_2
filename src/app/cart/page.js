
import CartClient from '@/components/Cart/CartClient'
import CartClient2 from '@/components/Cart/CartClient2'
import Head from 'next/head'
import React, { Suspense } from 'react'

// export const metadata = {
//   title: 'Cart',
//   description: 'Cart',
// }

const Cart = () => {
  return (
    <div style={{flex:1}}>
        {/* <Head>
        <title>Cart</title>
        <meta name="description" content="Cart" />
      </Head> */}
      {/* <CartClient/> */}
      <CartClient/>
  </div>
  )
}

export default Cart