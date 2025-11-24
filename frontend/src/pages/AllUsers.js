import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import { CiEdit } from "react-icons/ci";
import ChangeUserRolle from '../components/ChangeUserRolle';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id : ""
  })
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })
    const dataResponse = await fetchData.json()
    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
    //console.log(dataResponse)
  }
  useEffect(() => {
    fetchAllUsers()


  }, [])
  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-green-800 text-white'>
            <th>S.N</th>
            <th>Name</th>
            <th>Eamil</th>
            <th>Roll</th>
            <th>Created date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button className='bg-green-100 p-2 cursor-pointer  text-black
                   hover:bg-red-600 rounded-full hover:text-white'
                      onClick={() => {
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}
                    >
                      <CiEdit /></button>
                  </td>
                </tr>
              )

            })

          }
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRolle onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            calFunc={fetchAllUsers}
             
             />

        )
      }



    </div>
  )
}

export default AllUsers