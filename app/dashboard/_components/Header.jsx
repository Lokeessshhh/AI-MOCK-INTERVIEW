"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React , {useEffect} from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src="/logo.svg" width={160} height={100} alt="logo" />
        <ul className='hidden md:flex gap-6 '>
            <li className={`hover:text-purple-600 hover:font-bold transition-all cursor-pointer
               ${path=='/dashboard'&&'text-purple-600 font-bold'} 
            `}
            
            >Dashboard</li>

            <li className={`hover:text-purple-600 hover:font-bold transition-all cursor-pointer
               ${path=='/dashboard/questions'&&'text-purple-600 font-bold'} 
            `}
            >Questions</li>

            <li className={`hover:text-purple-600 hover:font-bold transition-all cursor-pointer
               ${path=='/dashboard/upgrade'&&'text-purple-600 font-bold'} 
            `}
            >Upgrade</li>

            <li className={`hover:text-purple-600 hover:font-bold transition-all cursor-pointer
               ${path=='/dashboard/how'&&'text-purple-600 font-bold'} 
            `}
            >How It Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header