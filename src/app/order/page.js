import OrderClient from '@/components/Order/OrderClient'
import Head from 'next/head'
import React from 'react'
// export const metadata = {
//   title: 'Order History',
//   description: 'Order History',
// }

const Order = () => {
  return (
    <div style={{flex:1}}>
       {/* <Head>
        <title>Order History</title>
        <meta name="description" content="Order History" />
      </Head> */}
   <OrderClient/>
   </div>
  )
}

export default Order