
import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
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

  )
}

export default Logo
