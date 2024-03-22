"use client"
import Logo from '@/components/Logo';
import Searchbar from '@/components/Searchbar';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import Image from "next/image";

import { usePathname } from 'next/navigation'; 
import { useSession, signIn, signOut } from 'next-auth/react'


const Layout = ({ children }) => {
    const currentPage = usePathname();
    const onEnterKeyPress = ()=>{
        console.log('handled')
        //implement
    }

    const { data: session, status: sessionStatus } = useSession();


    const loading = sessionStatus === 'loading';

    return (
        <div className="flex">
            <div className="flex flex-col w-1/6 borders">
                <Logo />
                <Sidebar currentPage={currentPage}/> 
            </div>
            <div className="flex-1 flex flex-col">

                <div className='flex flex-row h-13 borders'>
                    <Searchbar onEnterKeyPress={onEnterKeyPress}/>

                    {!loading && (session?.user ? (
                    <div className='flex gap-3 p-4'>
                        <button type='button' onClick={signOut} className='outline_btn w-32 h-10 mt-1.5'>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image
                            src={session?.user.image}
                            width={50}
                            height={50}
                            className='rounded-full mt-2'
                            alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <div className='flex gap-3 p-4'>
                        <button type='button' onClick={signIn} className='outline_btn w-32 h-10 mt-1.5'>
                            Sign In
                        </button>
                    </div>
                )
                )}

                </div>
                <div className='flex-1 background'>
                    {children} 
                </div>
            </div>
        </div>
    );
};

export default Layout;