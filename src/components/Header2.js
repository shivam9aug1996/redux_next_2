import React from 'react'

const Header2 = () => {
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
     
    </nav>
  </header>
  )
}

export default Header2