"use client"
import Link from 'next/link'
import Image from 'next/image'
import SidebarButtons from '@/components/layout/SidebarButtons';
import { usePathname } from 'next/navigation'; 

const Logo = () => {
  const currentPage = usePathname();

  return (
    <div className='sticky top-0 h-full' style={{ borderRight: '1px solid #DDDDDD' }}>  {/* Gray 6 is #DDDD */}
      <div className="flex justify-between items-center pb-7 py-6 px-6">
        <Link href="/" className="flex gap-2 center">
          <Image
            src='/assets/images/(LQ) Willow Logo.png'
            alt="logo"
            width={180}
            height={180}
            layout='fixed' 
            priority
          />
        </Link>
      </div>
      <SidebarButtons currentPage={currentPage}/>
    </div>
  )
}

export default Logo