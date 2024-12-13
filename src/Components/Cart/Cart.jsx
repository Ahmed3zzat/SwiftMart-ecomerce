import React, { useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import emptyCart1 from "../../assets/images/emptyCart1-2.png";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getCarts,
    updateQuantity,
    carts,
    totalNumber,
    totalPrice,
    removeCart,
    clearCart,
    LoadingCart,
    buttonLoading,
  } = useContext(cartContext);




  async function updateCart(id, count) {
    let flag = await updateQuantity(id, count);
    if (flag) {
      toast.success(`Your items have been updated: ${count}`);
    } else {
      toast.error("error happen");
    }
  }
  async function remove(id) {
    let item = await removeCart(id);
    if (item) {
      toast.success(`Your items have been deleted`);
    } else {
      toast.error("error happen");
    }
  }

  async function Clear() {
    let items = await clearCart();
    if (items) {
      toast.success(`Your items have been deleted`);
    } else {
      toast.error("error happen");
    }
  }

  useEffect(() => {
    getCarts();
  }, [carts]);

  if (carts?.length == 0 || carts == null) {
    return (
      <>
        <div className="flex flex-col justify-end items-center gap-1">
          <img className="w-1/3" src={emptyCart1} alt="" />
          <h2 className="text-3xl font-bold text-center tracking-wide font-fontBar text-green-600">
            NO ITEMS IN CART
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      {!LoadingCart ? (
        <>
          <div className="text-center mb-6 flex justify-around">
            <h3 className=" font-bold text-gray-800 dark:text-white uppercase">
              Total Price :{" "}
              <span className="text-green-600">
                ${totalPrice.toLocaleString()}
              </span>
            </h3>
            <h2 className="text-md font-bold text-gray-800 dark:text-white">
              Total Items: <span className="text-green-600">{totalNumber}</span>
            </h2>
          </div>

          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white dark:bg-gray-800">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts?.map((current) => (
                  <tr
                    key={current.product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-4">
                      <img
                        src={current.product.imageCover}
                        className="w-20 h-20 object-cover rounded-md"
                        alt={current.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {current.product.title.split(" ", 2).join(" ")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            updateCart(current.product._id, current.count - 1);
                          }}
                          className="p-1 rounded-full text-gray-600 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400"
                          type="button"
                        >
                          {!buttonLoading ? (
                            <>
                              <span className="sr-only">Decrease Quantity</span>
                              <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20 12H4"
                                />
                              </svg>
                            </>
                          ) : (
                            <i className="fas fa-spin fa-spinner"></i>
                          )}
                        </button>
                        <input
                          type="number"
                          required
                          className="w-12 text-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={current.count}
                        />
                        <button
                          onClick={async () => {
                            updateCart(current.product._id, current.count + 1);
                          }}
                          className="p-1 rounded-full text-gray-600 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400"
                          type="button"
                        >
                          {!buttonLoading ? (
                            <>
                              <span className="sr-only">Increase Quantity</span>
                              <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </>
                          ) : (
                            <i className="fas fa-spin fa-spinner"></i>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${current.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          remove(current.product._id);
                        }}
                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              to={"/payment"}
              className="inline-block tracking-wider w-full border border-2 border-green-600 py-2 mt-4 text-sm font-medium rounded-b-lg hover:bg-green-600 hover:text-white transition duration-700 text-center"
            >
              PAYMENT
            </Link>
          </div>

          <div className="text-end p-9 text-[1.1rem]">
            Do you want to clean{" "}
            <span
              onClick={Clear}
              className="text-red-600 underline cursor-pointer px-1"
            >
              cart
            </span>
            ...?
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
