import React, { use, useContext, useState } from "react";
import Logo from "./Logo"; // Assuming Logo is in the same folder
import { BsSearch } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetailes } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispathch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context=useContext(Context)
  const navigate = useNavigate()
  const searchInput=useLocation()
  const URLSearch=new URLSearchParams(searchInput?.search)
  const searchQuery=URLSearch.getAll("q")
  const[search, setSearch]=useState(searchQuery)
  

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message)
      dispathch(setUserDetailes(null))
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }
  }
  const handleSearch=(e)=>{
    const {value}=e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)


    }else{
      navigate("/search")
    }

  }
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container px-4  flex items-center justify-between">
        <div className="ml-4"> {/* Adds padding to the left */}
          <Link to={"/"}>
            <Logo w={180} h={100} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input type="text" placeholder="Search product hear..... " className="w-full outline-none "  onChange={handleSearch} value={search}/>
          <div className="text-lg h-8 bg-green-800 flex items-center justify-center 
          rounded-r-full text-white w-10">
            <BsSearch />
          </div>
        </div>
        <div className="pr-4 flex items-center gap-6" >
          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className="text-3xl cursor-pointer flex justify-between" 
                onClick={()=>setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className="w-12 h-12 rounded-full" alt={user?.name} />
                    ) :
                      <HiUserCircle />
                  }
    
                </div>

              )
            }
          
            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' 
                         onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>

                      )
                    }
                    <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                    onClick={()=>setMenuDisplay(preve => !preve)}>Order</Link>
                    
                  </nav>
                </div>

              )
            }
          </div>
          {
            user?._id && (
              <Link to={"/cart"} className="text-2xl relative">
              <span><FaShoppingCart /></span>
              
              <div className="bg-green-800 text-white w-5 h-5 rounded-full p-1 flex items-center
               justify-center absolute -top-2 -right-3" >
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>

            )
          }
         
          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className="px-3 py-1 rounded-full
                 text-white bg-green-800  hover:scale-110 hover:bg-green-600">Logout</button>
              ) : (
                <Link to={"/login"} className="px-3 py-1 rounded-full text-white 
                 bg-green-800  hover:scale-110 hover:bg-green-600" >Login</Link>

              )
            }


          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
