
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'

const HeaderWrapper = () => {
  const token = cookies()?.get('token')?.value
  let userData = cookies()?.get('userData')?.value
  userData=JSON.parse(userData)
  console.log(userData)
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="ml-5">
          <Link
            className="font-bold text-white tracking-wide cursor-pointer"
            href="/"
          >
            My Website
          </Link>
        </div>
        {!token ? (
          <div>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="text-gray-300 hover:text-white cursor-pointer mr-5"
              href="/signup"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div>
            {/* <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/"
            >
              {`Welcome ${name}`}
            </Link> */}
            <button
              // onClick={() => {
                
              // }}
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
            >
               {`Welcome ${userData?.name}`}
            </button>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/cart"
            >
              {`Cart (${0})`}
            </Link>
           <LogoutButton/>
          </div>
        )}
      </nav>
    </header>
  )
}

export default HeaderWrapper