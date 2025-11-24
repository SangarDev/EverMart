import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {


  const [data, setData] = useState([])

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)


  const location = useLocation()

  const urlSearch = new URLSearchParams(location.search)

  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}

  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true

  })


  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy,setSortBy]=useState("")
  console.log("sortby",sortBy)



  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })

    })
    const dataResponse = await response.json()
    setData(dataResponse?.data)

  }
  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [filterCategoryList])
  //{params?.categoryName}
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)
    setFilterCategoryList(arrayOfCategory)
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory])

  const handleOnChangeSortBy=(e)=>{
    const{value}=e.target
    setSortBy(value)
    if(value==='asc'){
      setData(preve=>preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value==='dsc'){
      setData(preve=>preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }
  useEffect(()=>{

  },[sortBy])

  return (
    <div className='container mx-auto p-4'>
      {/**Destop*/}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/**left*/}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/**sort by*/}
          <div>
            <h3 className='text-base text-white bg-green-800 p-1 uppercase font-medium border border-green rounded'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy==='asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price-Low</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy'checked={sortBy==='dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                <label>Price-High</label>
              </div>
            </form>
          </div>
          {/**sort by category 16:56:41*/}
          <div>
            <h3 className='text-base text-white bg-green-800 p-1 uppercase font-medium border border-green rounded'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3'>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>

        {/**right (Products)*/}
        <div className='px-4'>
        <p className='font-medium text-lg py-2'>Search Result : {data.length}</p>
        <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
          {
            data.length !== 0 &&(
              <VerticalCard data={data} loading={loading} />
            )
          }

        </div>
        </div>

      </div>
    </div>
  )
}

export default CategoryProduct