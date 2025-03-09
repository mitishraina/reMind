import React from 'react'

const Navbar = () => {
  return (
    <nav className='text-white flex justify-between items-center px-8 py-10 h-14'>
        <div className=" text-5xl logo font-bold cursor-pointer">re<span className='text-red-400'>M</span>ind</div>
          <button className='ring-white ring-2 rounded-full overflow-hidden'>
          <a href='www.github.com/mitishraina/'><img className='h-8 ' src='/icons/github.svg' alt='github'></img></a>
          </button>
    </nav>
  )
}

export default Navbar

