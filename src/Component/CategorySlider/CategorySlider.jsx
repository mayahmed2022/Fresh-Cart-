import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { TailSpin } from 'react-loader-spinner'

export default function CategorySlider() {
 
  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

 const { data , isLoading}= useQuery("categorySlider" , getCategory);
 console.log("Dta", data)
    

  if (isLoading) {
    return  <div className=" d-flex justify-content-center align-items-center bg-body vh-100">
       <TailSpin
         visible={true}
         height="80"
         width="80"
         color="#4fa94d"
         ariaLabel="tail-spin-loading"
         radius="1"
         wrapperStyle={{}}
         wrapperClass=""
       />
     </div>;
   }
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };


  return (
    <Slider {...settings}>
      {data.data.data.map( (category , idx ) => <div key={idx}> 
        <img style={{height:'150px'}} className=" w-100 mt-5 ps-4" src={ category.image}  alt= {category.name}/>
        <h6 className=" text-center" >{category.name} </h6>
      </div> )}
    </Slider>
  );
}
