import React, { useEffect, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../../Context/WishlistContext";

export default function Products() {
  let { addCart } = useContext(cartContext);
  let { AddProductWishlist } = useContext(wishContext);

  const [wishlistStatus, setWishlistStatus] = useState({});

  const toggleWishlist = (id) => {
    setWishlistStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  async function addProductToCart(id) {
    let flag = await addCart(id);
    if (flag) {
      toast.success("Product added successfully to your cart");
    } else {
      toast.error("Error adding your product to the cart");
    }
  }
  async function addWish(id) {
    let flag = await AddProductWishlist(id);

    if (flag) {
      toast.success(`Your item has been added.`);
      toggleWishlist(id);
    } else {
      toast.error("Error adding your product to the wishlist");
    }
  }

  /*  const [Products, setProducts] = useState(null);
  const [ErrorMessage, setErrorMessage] = useState("");
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((errors) => {
        setErrorMessage(errors.response.data.message);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);
  if (ErrorMessage) {
    return <p>check your data</p>;
  }*/

  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    // .then((response) => response.data.data);
  }
  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
    // staleTime: 60000,
    refetchInterval: 2000,
    // retry: 5,
    // refetchIntervalInBackground: false,
    // refetchOnWindowFocus:true,
    select: (data) => data.data.data,
  });

  if (isError) {
    return <p className="text-red-700">ahmed</p>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-5 px-2">
          {data?.map((current) => (
            <div
              key={current.id}
              className="relative bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl group"
            >
              {/* Wishlist Icon */}
              <button
                onClick={() => {
                  addWish(current.id);
                }}
                className={`absolute top-2 right-2 z-[2000] bg-white p-2 rounded-full shadow-md transition duration-300 group-hover:translate-y-[0] translate-y-[-500px] ${
                  wishlistStatus[current.id]
                    ? "text-red-500 translate-y-[0]"
                    : "text-gray-500 hover:text-red-600"
                }`}
              >
                <i className="fas fa-heart"></i>
              </button>

              <Link
                to={`/ProductDetails/${current.category.name}/${current.id}`}
              >
                {/* Image and Sale Badge */}
                <div className="relative">
                  <img
                    src={current.imageCover}
                    alt={current.title}
                    className="w-full"
                  />
                  {current.priceAfterDiscount ? (
                    <div className="absolute top-2 left-0">
                      <div className="relative w-0 h-0 border-l-[40px] border-t-[10px] border-b-[10px] border-r-[10px] border-l-green-500 border-t-green-500 border-r-transparent border-b-green-500">
                        <span className="absolute font-fontBody top-[50%] start-[-5px] translate-x-[-100%] translate-y-[-50%] text-white text-xs font-bold">
                          Sale
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Product Details */}
                <div className="p-4 pb-2">
                  <h2 className="text-xs uppercase text-gray-400 tracking-wide">
                    {current.category.name}
                  </h2>
                  <h3 className="text-lg font-bold text-gray-800 mt-2 truncate">
                    {current.title.split(" ", 2).join(" ")}
                  </h3>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    {current.priceAfterDiscount ? (
                      <>
                        <span className="text-green-600 ">
                          {current.priceAfterDiscount} EGP
                        </span>
                        <span className="line-through ps-2 text-red-600">
                          {current.price} EGP
                        </span>
                      </>
                    ) : (
                      <span className="text-green-600 inline-block">
                        {current.price} EGP
                      </span>
                    )}

                    <div className="flex items-center text-yellow-400">
                      <i className="fas fa-star"></i>
                      <span className="text-sm font-medium ml-1 text-gray-700">
                        {current.ratingsAverage.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-gray-100 py-1 my-2 rounded-md shadow-md inline-block ms-auto">
                    Quantity:{" "}
                    <span className="text-green-600 font-bold">
                      {current.quantity}
                    </span>
                  </p>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addProductToCart(current.id);
                }}
                className="btn"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
