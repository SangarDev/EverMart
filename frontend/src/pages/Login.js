import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Login = () => {
  const[showPassword,setShowPassord] = useState(false)
  const[data,setData]=useState({
    email : "",
    password : "" 
  })
  const navigate = useNavigate()
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)
  
  const handleOnChange =(e) => {
    const {name, value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]: value

      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const dataResponse = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers:{
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const dataApi= await dataResponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()

    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }
  //console.log("data login",data)
  return (
    <section id="login">
        <div className='mx-auto container p-4'>
            <div className='bg-white p-6 w-full max-w-sm mx-auto rounded'>
              <div className='w-20 h-20 mx-auto'>
                <img src={loginIcons} alt='login icons'/>
              </div>
              <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                  <label>Email: </label>
                  <div className='bg-slate-100 p-2 '>
                   <input type='email' placeholder='Enter the emil'
                   onChange={handleOnChange}
                   name='email'
                   value={data.email}
                    className='w-full h-full outline-none bg-transparent'/>
                  </div>
                </div>
                <div>
                  <label>Password: </label>
                  <div className='bg-slate-100 p-2 flex'>
                   <input type={showPassword ? "text" : "password"} 
                   onChange={handleOnChange}
                   value={data.password}
                   name='password'
                   placeholder='Enter the password' className='w-full h-full
                  outline-none bg-transparent'/>
                   <div className='cursor-pointer text-xl' onClick={()=>setShowPassord((preve)=>!preve)}>
                    <span>
                      {
                        showPassword ? (
                          <FaEyeSlash className='bg-green-600' />
                        )
                        :
                        (
                          <FaEye />
                        )
                      }        
                    </span>
                  </div>
                </div>
                   <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-green-600'>
                       Forgot password ?
                   </Link> 
                </div>
                <button className='bg-green-800 hover:bg-green-600 text-white px-6 py-2 w-full max-w-[150px]
                rounded-full 
                hover:scale-110 transition-all mx-auto block mt-6 '>Login</button>
              </form>
              <p className='my-5'>I don't have account ? <Link to={"/sign-up" } className='text-green-600
               hover:text-green-800 hover:underline'>sign up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login