import React, { useEffect, useState } from "react";
import Style from "./MainSlider.module.css";
import Slider from "react-slick";

import grocery from "../../assets/images/grocery-banner.png";
import grocery2 from "../../assets/images/grocery-banner-2.jpeg";

import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 1000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <Slider {...settings} className="mb-10">
            <img
              className="w-full h-[200px] object-cover"
              src={slider1}
              alt="slide1"
            />
            <img
              className="w-full h-[200px] object-cover"
              src={slider2}
              alt="slide2"
            />
            <img
              className="w-full h-[200px] object-cover"
              src={slider3}
              alt="slide3"
            />
          </Slider>
        </div>
        <div>
          <img
            className="w-full h-[100px] object-cover z-50 relative"
            src={grocery}
            alt="grocery1"
          />
          <img
            className="w-full h-[100px] object-cover z-40 relative"
            src={grocery2}
            alt="grocery2"
          />
        </div>
      </div>
    </>
  );
}
