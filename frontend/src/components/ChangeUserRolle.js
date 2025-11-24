import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const ChangeUserRolle = ({
    name,
    email,
    role,
    userId,
    onClose,
    calFunc,
}) => {
    const [userRole,setUserRole] = useState(role)
    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)
        console.log(e.target.value)
    }
    const updateUserRole= async() =>{
        const fetchResponse= await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials: "include",
            headers:{
                "content-type" : "application/json"

            },
            body: JSON.stringify({
                userId : userId,
                role : userRole
            })
        })
        const responseData= await fetchResponse.json()
        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            calFunc()
        }
        console.log("role updated",responseData)
        
    }
    
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0  w-full h-full
         z-10 flex justify-between items-center bg-slate-200 bg-opacity-40 '>
            <div className='mx-auto bg-green-800 shadow-md p-4 w-full max-w-sm text-white'>
                <div>
                    
                    <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose/>
                    </button>

                </div>
                <h1 className='pb-4 text-lg font-medium'>ChangeUserRolle</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p className='text-white'>Role :</p>
                    <select className='bg-green-950 border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}

                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='w-fit mx-auto block py-1 px-3 rounded-full
                 bg-red-600 hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    )
}

export default ChangeUserRolle