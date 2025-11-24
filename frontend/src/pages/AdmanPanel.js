import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HiUserCircle } from "react-icons/hi2";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdmanPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate= useNavigate()
    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN)
            navigate("/")

    },[user])
    return (
        <div className='min-h-[calc(100vh-120px)]  md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>

                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className="text-5xl cursor-pointer relative flex justify-center" >
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className="w-20 h-20 rounded-full mt-6" alt={user?.name} />
                            ) :
                                <HiUserCircle />
                        }

                    </div>
                    <p className='capitalize text-lg font-simibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>

                </div>
                <div>
                    {/**navigation "Abasynian" */}
                </div>
                <div>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1  hover:bg-green-800 hover:text-white'>All usesrs</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-green-800 hover:text-white'>All products</Link>
                        <Link to={"banner-products"} className='px-2 py-1 hover:bg-green-800 hover:text-white'>All Banners</Link>
                        <Link to={"all-orders"} className='px-2 py-1 hover:bg-green-800 hover:text-white'>All Orders</Link>
                       
                    </nav>
                </div>

            </aside>

            <main className='w-full h-full p-2'>
                <Outlet/>

            </main>
        </div>
    )
}

export default AdmanPanel