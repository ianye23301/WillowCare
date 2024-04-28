"use client"
import { useRouter } from 'next/router';
import UserCard from './UserCard';

const page = ({params}) => {

    const {id} = params

    return (
        <UserCard/>
    )
}

export default page; 