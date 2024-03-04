
import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <logo className = 'flex justify-between items-center py-7 px-6'>
        <Link href='/' className='flex gap-2 center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Willowcare</p>
      </Link>
    </logo>
  )
}

export default Logo
