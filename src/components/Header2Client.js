import React from 'react'

const Header2Client = () => {
  return (
    <>
       {!reduxToken ? (
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
            onClick={() => {}}
            className="mr-5 text-gray-300 hover:text-white cursor-pointer"
          >
            {`Welcome ${reduxUserData?.name}`}
          </button>
          <Link
            className="mr-5 text-gray-300 hover:text-white cursor-pointer"
            href="/cart"
          >
            {/* {`Cart (${data?.cart?.length||0})`} */}
            {`cart (${cartValue})`}
          </Link>
          <Link
            className="mr-5 text-gray-300 hover:text-white cursor-pointer"
            href="/order"
          >
            {/* {`Cart (${data?.cart?.length||0})`} */}
            {`Order`}
          </Link>
          <button
            onClick={() => {
              //dispatch(logout());
              logout();
              
      //         dispatch(setCart([]))
      // dispatch(setOrder([]))
            }}
            className="mr-5 text-gray-300 hover:text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </>
  )
}

export default Header2Client