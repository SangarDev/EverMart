import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import Giftcermonony from './Giftcermonony';

const Home = () => {
  
  return (
    <div>
      
      <CategoryList/>
      <BannerProduct/>
      <Giftcermonony/>
      <HorizontalCardProduct category={"pakistani cloths"} heading={"Pakistani girls clothing"}/>
      <HorizontalCardProduct category={"afghani clothes"} heading={"Afhani girls clothing"}/>
      <HorizontalCardProduct category={"watches"} heading={"smart watches"}/>
      <VerticalCardProduct category={"western clothes"} heading={"New 2025"}/>
      <VerticalCardProduct category={"males"} heading={"New 2025"}/>
      <VerticalCardProduct category={"femal"} heading={"New 2025"}/>
      
    </div>
    
    
  )
}

export default Home