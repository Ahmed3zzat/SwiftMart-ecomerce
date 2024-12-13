import React, { useEffect, useState } from "react";
import Style from "./Brands.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Brands() {
  const [load, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(false);
  function GetAllBrands() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
        setLoading(false);
        // console.log(error.response.data.message);
      });
  }
  useEffect(() => {
    GetAllBrands();
  }, []);
  if (error) {
    return <p>{error.split(" ", 2).join(" ")}</p>;
  }
  return (
    <>
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!data ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loading />
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
              {data.map((current) => (
               <Link to={`/subBrand/${current._id}`}>
                  <div
                    key={current._id}
                    className="brand-box relative group overflow-hidden rounded-lg shadow-lg bg-white"
                  >
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-500 opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="p-4 text-center">
                      <p className="text-xl font-semibold text-gray-800 group-hover:text-white">
                        {current.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
