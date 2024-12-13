import React, { useEffect, useState } from "react";
import Style from "./AllOrder.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import allOrders from "../../assets/images/allOrdersEmpty.jpg"

export default function AllOrder() {
  let userID = localStorage.getItem("idForUser");
  let [data, setData] = useState(null);
  let [ErrorApi, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState([]);

  async function getUserOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  useEffect(() => {
    getUserOrders();
  }, []);

  useEffect(() => {
    if (data) {
      const arr = data.map((ele) => ele.totalOrderPrice);
      let k = 0;
      for (const price of arr) {
        k += price;
      }
      setTotalPrice(k);
    }
  }, [data]);

  // const monthName = Date.toLocaleString("default", { month: "long" });

  // console.log(data?._id); // id for order
  // console.log(ErrorApi);

if(data==null||data?.length==0) {
  return<div>
    <div className="flex flex-col justify-end items-center gap-1">
          <img src={allOrders} alt="" />
          <h2 className="text-3xl font-bold text-center tracking-wide font-fontBar text-green-600">
          </h2>
        </div>
  </div>
}
  return (
    <div className="p-6 bg-gray-50 shadow-md rounded-lg">
      {ErrorApi && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {"There is an error with your request."}
        </div>
      )}

      {data && (
        <div className="invoice grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 mb-6 p-6 bg-white shadow-lg rounded-lg justify-between ">
          <div className="box space-y-4">
            <p className="text-gray-600 uppercase font-bold text-sm">
              Invoice To:
            </p>
            <h2 className="name text-xl font-semibold text-gray-900">
              {data[0].user.name}
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <p className="text-gray-500">
                  13 Ibrahim El Laqany Street, Roxy
                </p>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fa-solid fa-phone text-green-500"></i>
                <span className="text-gray-500">{data[0].user.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fa-regular fa-envelope text-green-500"></i>
                <span className="text-gray-500">{data[0].user.email}</span>
              </li>
            </ul>
          </div>

          <div className="box space-y-4 ">
            <ul className="space-y-2">
              <li className="flex gap-3">
                <h4 className="font-medium text-gray-600">Date:</h4>
                <p className="text-gray-700">
                {data[data.length-1].createdAt.split("",10).join(" ")}
                </p>
              </li>
              <li className="flex gap-3">
                <h4 className="font-medium text-gray-600">Payment Method:</h4>
                <p className="text-gray-700">
                  {data[data.length - 1].paymentMethodType}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((current) =>
                current.cartItems
                  ? current.cartItems.map((ele, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          {ele.product.title.split(" ", 2).join(" ")}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {ele.count}
                        </td>
                        <td className="px-6 py-4">{ele.price} EGP</td>
                        <td className="px-6 py-4">
                          {ele.count * ele.price} EGP
                        </td>
                      </tr>
                    ))
                  : null
              )
            ) : (
              <tr>
                <td colSpan="4">
                  <Loading />
                </td>
              </tr>
            )}

            <tr className="bg-gray-50 font-bold">
              <td></td>
              <td></td>
              <td className="px-6 py-4 text-gray-700 text-right">Total:</td>
              <td className="px-6 py-4 text-green-700 text-xl">
                {totalPrice.toLocaleString()} EGP
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
