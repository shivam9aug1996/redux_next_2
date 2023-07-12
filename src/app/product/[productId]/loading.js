import React from 'react'
import Skeleton from 'react-loading-skeleton'

const loading = () => {
  return (
    <div style={{flex:1}}>
    <Skeleton height={80}/>
    </div>
  )
}

export default loading