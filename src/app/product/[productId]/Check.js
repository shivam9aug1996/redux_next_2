import React from 'react'

const Check = async() => {
  await new Promise((res,rej)=>{
    setTimeout(() => {
      res("hi")
    }, 2000);
  })
  return (
    <div>welcome</div>
  )
}

export default Check