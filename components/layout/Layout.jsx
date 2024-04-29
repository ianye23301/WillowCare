"use client"

import Sidebar from '@/components/layout/Sidebar';
import Searchbar from '@/components/Searchbar';
import Link from 'next/link';
import Image from "next/image";
import Profile from './Profile';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation'

const Layout = ({ children }) => {
    const path = usePathname();
    const portal_side = path.includes('invite')

    const onEnterKeyPress = () => {
        console.log('handled');
        //implement
    };

    const { data: session, status: sessionStatus } = useSession();
    const loading = sessionStatus === 'loading';

    return ( portal_side ? (
        <div className='flex flex-col'>
            <div className="border-b flex flex-row">
                <img 
                src='/assets/images/logo.png'
                alt="logo"
                width={120}
                height={120}
                className='mx-7 my-4'
                />
            </div>
           
            <div>
                {children}
            </div>

        </div>
    ) : (
        <div className="flex">
            <div className="flex flex-col w-1/6">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <div className='flex items-center search sticky top-0 pr-4'>
                    <Searchbar onEnterKeyPress={onEnterKeyPress}/>
                    <Profile/>
                    {/* {!loading && (session?.user ? (
                        <div className='flex items-center gap-3'>
                            <button type='button' onClick={signOut} className='outline_btn login w-32 h-7'>
                                Sign Out
                            </button>
                            <Link href='/profile'>
                                <Image
                                    src={session?.user.image}
                                    width={50}
                                    height={50}
                                    className='rounded-full p-1'
                                    alt='profile'
                                    layout='fixed' 
                                    priority
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className='flex gap-3'>
                            <button type='button' onClick={signIn} className='login outline_btn w-32 h-7'>
                                Sign In
                            </button>
                        </div>
                    ))} */}
                </div>
                <div className='flex-1 flex flex-col h-full background'>
                    {children} 
                </div>
            </div>
        </div>
    ));
};

export default Layout;
