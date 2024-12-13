import React, { useEffect, useState } from "react";
import Style from "./SupBrand.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function SupBrand() {
  const { brandID } = useParams();
  console.log(brandID);
  // console.log(idCategory);
  const [data, setData] = useState(null);
  const [load, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function GetSpecificBrand() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${brandID}`)
      .then((response) => {
        console.log(response.data);
        setError(error.message);
        setData(response.data.data);
      });
  }
  useEffect(() => {
    GetSpecificBrand();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          {error.split(" ", 2).join(" ")}...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {data ? (
        <div
          key={data._id}
          className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white"
        >
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4 text-center">
            <p className="text-lg font-medium text-gray-700 hover:text-green-500">
              {data.name}
            </p>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}