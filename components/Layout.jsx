"use client"

import Logo from '@/components/Logo';
import Searchbar from '@/components/Searchbar';
import Link from 'next/link';
import Image from "next/image";

import { useSession, signIn, signOut } from 'next-auth/react';

const Layout = ({ children }) => {
    const onEnterKeyPress = () => {
        console.log('handled');
        //implement
    };

    const { data: session, status: sessionStatus } = useSession();
    const loading = sessionStatus === 'loading';

    return (
        <div className="flex">
            <div className="flex flex-col w-1/6">
                <Logo />
            </div>
            <div className="flex-1 flex flex-col">
                <div className='flex  items-center  search sticky top-0'>
                    <Searchbar onEnterKeyPress={onEnterKeyPress}/>
                    {!loading && (session?.user ? (
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
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className='flex gap-3'>
                            <button type='button' onClick={signIn} className='login outline_btn w-32 h-7'>
                                Sign In
                            </button>
                        </div>
                    ))}
                </div>
                <div className='flex-1 background'>
                    {children} 
                </div>
            </div>
        </div>
    );
};

export default Layout;
