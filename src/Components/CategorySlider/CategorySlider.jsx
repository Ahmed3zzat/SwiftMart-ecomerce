import React, { useEffect, useState } from "react";
import Style from "./CategorySlider.module.css";

import Slider from "react-slick";

import axios from "axios";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  const [Categories, setCategories] = useState(null);
  function getAllCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((current) => {
        setCategories(current.data.data);
      })
      .catch((error) => {
      });
  }
  
  useEffect(() => {
    getAllCategories();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Slider {...settings} className="mb-10">
        {Categories ? (
          Categories.map((ele) => (
            <div key={ele._id} className="">
              <img
                src={ele.image}
                alt={ele.name}
                className="w-[full] h-[200px] object-cover"
              />
              <p className="text-sm px-1">{ele.name.split(" ", 1).join(" ")}</p>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </Slider>
    </>
  );
}
