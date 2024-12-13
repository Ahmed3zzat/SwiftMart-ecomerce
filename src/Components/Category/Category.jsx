import React, { useEffect, useState } from "react";
import Style from "./Category.module.css";
import Loading from "../Loading/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Category() {
  const [data, setData] = useState(null);
  const [load, setLoading] = useState(false);
  function GetAllCategories() {
    setLoading(true);
    axios(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  useEffect(() => {
    GetAllCategories();
  }, []);

  if (load) {
    return <Loading />;
  }
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 p-4">
      {data
        ? data.map((current) => (
            <Link
              to={`/subCategory/${current._id}`}
              key={current._id}
              className="group overflow-hidden cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <img
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                src={current.image}
                alt={current.name}
              />
              <div className="p-3 text-center">
                <p className="text-lg font-medium text-green-500 group-hover:text-green-600">
                  {current.name}
                </p>
              </div>
            </Link>
          ))
        : null}
    </div>
  );
}
