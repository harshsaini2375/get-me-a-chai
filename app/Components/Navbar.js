'use client'

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const [dropdown, setdropdown] = useState(false)
  const { data: session } = useSession()

  return (

    <div>
      <nav className='border md:h-16 px-5 border-black flex-col md:flex-row flex justify-between  bg-slate-950 text-white'>
        <Link href='/' className="flex justify-center items-center gap-2">
          <div className="w-10"><Image height={50} width={50} className="rounded-full" src="/tea.gif" alt="tea" /></div>
          <div>Buy me a Chai</div>
        </Link>
        <ul className='flex gap-0 md:gap-5 pt-2 justify-center'>
          {!session && <Link href="/login">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
          </Link>}

          {/* onBlur={()=>{dropdown&&setdropdown(false)}} */}
          {session && <><div  onClick={() => { setdropdown(!dropdown) }} className="flex flex-col  z-10 items-start">

            <button type="button" className=" h-10 flex justify-center items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center me-2 mb-2 pl-4">
              <div className='flex gap-2 justify-center items-center'>
              <Image height={37} width={37}  className='rounded-full'  src={session.user.image?session.user.image:"/man.gif"} alt="user" />
                <div>{session.user.name}</div>
              </div>
              <div className=' invert  '><Image height={50} width={50}  src="/dropdown.svg" alt="" /></div>
            </button>
            <div className={dropdown ? 'bg-white border border-gray-300 rounded-md shadow-lg' : 'hidden bg-white border border-gray-300 rounded-md shadow-lg'}>
           
              <Link href={`/${session.user.name}`} ><div className="block px-4 py-1 text-gray-800 hover:bg-gray-100">Profile</div></Link>

              <Link href="/dashboard" ><div className="block px-4 py-1 text-gray-800 hover:bg-gray-100">Dashboard</div></Link>

            </div>
          </div>
          </>}

          {session && <Link href="/login">
            <button onClick={() => { signOut() }} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
          </Link>}

        </ul>
      </nav>
    </div>
  )
}

export default Navbar
