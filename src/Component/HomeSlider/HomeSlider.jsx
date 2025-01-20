import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
  var settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 200,
    cssEase: "linear"
  };



  return (
    // <Slider {...settings}>
    //   <div>
    //   <img  style={ { height: "300px"}} src={require('../../images/slider-image-1.jpeg')} className='w-100' alt="uu" />

    //   </div>
    //   <div>
    //   <img  style={ { height: "300px"}} src={require('../../images/slider-image-2.jpeg')} className='w-100' alt="uu" />

    //   </div>
    //   <div>
    //   <img  style={ { height: "300px"}} src={require('../../images/slider-image-3.jpeg')} className='w-100' alt="uu" />

    //   </div>
    //   <div>
    //   <img  style={ { height: "300px"}} src={require('../../images/slider-2.jpeg')} className='w-100' alt="uu" />

    //   </div>
      

      
    // </Slider>

    <div className="slider-container">
      <Slider {...settings}>
      <div>
      <img  style={ { height: "300px"}} src={require('../../images/slider-image-1.jpeg')} className='w-100 pe-3' alt="uu" />

      </div>
      <div>
      <img  style={ { height: "300px"}} src={require('../../images/slider-image-2.jpeg')} className='w-100 pe-3' alt="uu" />

      </div>
      <div>
      <img  style={ { height: "300px"}} src={require('../../images/slider-image-3.jpeg')} className='w-100 pe-3' alt="uu" />

      </div>
      <div>
      <img  style={ { height: "300px"}} src={require('../../images/slider-2.jpeg')} className='w-100 pe-3' alt="uu" />

      </div>
       
      </Slider>
    </div>
  );
}