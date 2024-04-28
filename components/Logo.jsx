"use client"
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation'; 



const Logo = () => {
  const currentPage = usePathname();

  return (
    <div className=' sticky top-0'>
    <logo className="flex justify-between items-center pb-7 py-6 px-6">
      <Link href="/" className="flex gap-2 center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={180}
          height={180}
        />
      </Link>
    </logo>
    <Sidebar currentPage={currentPage}/> 
    </div>

  )
}

export default Logo
