import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { data, Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import imageCompression from "browser-image-compression";


const Signup = () => {
  const[showPassword,setShowPassord] = useState(false)
  const[showConfirmPassword,setShowCofirmPassword] = useState(false)
    const[data,setData] = useState({
      email : "",
      password : "" ,
      name : "",
      confirmPassword :"",
      profilePic :"",
    })
    const navigate = useNavigate()

    const handleOnChange =(e) => {
      const {name, value} = e.target
      setData((preve)=>{
        return{
          ...preve,
          [name]: value
  
        }
      })
    }
    // Install with npm: npm install browser-image-compression

    const handleUploadPic = async (e) => {
      const file = e.target.files[0]; // Get the uploaded file
    
      // Compression options
      const options = {
        maxSizeMB: 1, // Maximum file size (in MB) after compression
        maxWidthOrHeight: 800, // Maximum width or height of the image
        useWebWorker: true, // Use a web worker for faster compression
      };
    
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, options);
    
        // Convert the compressed file to Base64
        const imagePic = await imageTobase64(compressedFile);
    
        // Update the state with the compressed image
        setData((prev) => ({
          ...prev,
          profilePic: imagePic,
        }));
    
        console.log("Image compressed and uploaded successfully");
      } catch (error) {
        console.error("Error during image compression:", error);
      }
    };
    
    // Helper function to convert a file to Base64
    const imageTobase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };
    
    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(data.password === data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
              "Content-Type": "application/json"  // Make sure it's 'Content-Type' not 'conten-type'
          },
          body: JSON.stringify(data)
      })
        const dataApi = await dataResponse.json()
        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/login")
        }
        if(dataApi.error){
          toast.error(dataApi.message) 
        }
      }else{
        //console.log("Please check the password does not match")
        toast.error("Your password is not match") 
      } 
    }
  return (
    <section id="signup">
    <div className='mx-auto container p-4'>
        <div className='bg-white p-6 w-full max-w-sm mx-auto rounded'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
            <img src={data.profilePic || loginIcons} alt='login icons'/>
            </div>
           <form>
            <label>
              <input type='file' className='hidden' onChange={handleUploadPic}/>
              <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer
               text-center py-4 absolute bottom-0 w-full'>
               Upload Photo
            </div>
            </label>
            
           </form>
          </div>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='grid'>
              <label>Name: </label>
              <div className='bg-slate-100 p-2 '>
               <input type='text' placeholder='Enter the name'
               onChange={handleOnChange}
               required
               name='name'
               value={data.name}
                className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>
            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-100 p-2 '>
               <input type='email' placeholder='Enter the emil'
               onChange={handleOnChange}
               required
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
               required
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
               
            </div>
            <div>
              <label>Confirm Password: </label>
              <div className='bg-slate-100 p-2 flex'>
               <input type={showConfirmPassword ? "text" : "password"} 
               value={data.confirmPassword}
               name='confirmPassword'
               onChange={handleOnChange}
               required
               placeholder='Enter confirm  password' className='w-full h-full
              outline-none bg-transparent'/>
               <div className='cursor-pointer text-xl' onClick={()=>setShowCofirmPassword((preve)=>!preve)}>
                <span>
                  {
                    showConfirmPassword ? (
                      <FaEyeSlash className='bg-green-800' />
                    )
                    :
                    (
                      <FaEye />
                    )
                  }        
                </span>
              </div>
            </div>
               
            </div>
            <button className='bg-green-800 hover:bg-green-600 text-white px-6 py-2 w-full max-w-[150px]
            rounded-full 
            hover:scale-110 transition-all mx-auto block mt-6'>Signup</button>
          </form>
          <p className='my-5'>already have account ? <Link to={"/login" } className='text-green-600
           hover:text-green-800 hover:underline'>Login</Link></p>
        </div>
    </div>
</section>
  )
}

export default Signup