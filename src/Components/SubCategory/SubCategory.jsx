import React, { useEffect, useState } from "react";
import Style from "./SubCategory.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function SubCategory() {
  const { idCategory } = useParams();
  console.log(idCategory);
  // console.log(idCategory);
  const [data, setData] = useState(null);
  const [load, setLoading] = useState(false);

  function GetSpecificCategories() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${idCategory}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
      });
  }
  useEffect(() => {
    GetSpecificCategories();
  }, []);
  console.log(data);
  return (
    <div className="">
      {data ? (
        <Link
          to={`/subCategory/${data._id}`}
          key={data._id}
          className="group overflow-hidden cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
        >
          <img
            className="w-full md:w-1/2 md:mx-auto group-hover:scale-105 transition-transform duration-300"
            src={data.image}
            alt={data.name}
          />
          <div className="p-9 text-center">
            <p className="text-lg font-medium text-green-500 group-hover:text-green-600">
              {data.name}
            </p>
          </div>
        </Link>
      ) : null}
    </div>
  );
}
