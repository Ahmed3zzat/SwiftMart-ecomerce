import React, { useContext, useEffect, useState } from "react";
import Style from "./Home.module.css";
import Products from "../Products/Products";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { wishContext } from "../../Context/WishlistContext";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { useFormik } from "formik";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import * as jwtDecode from "jwt-decode";

export default function Home() {
const token = localStorage.getItem("token");
  const [searchProduct, setRelatedProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
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

  async function getProducts(values) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const products = response.data.data;

      if (values?.search) {
        const filteredProducts = products.filter((current) =>
          current.title.toLowerCase().includes(values.search.toLowerCase())
        );
        setRelatedProduct(filteredProducts);
      } else {
        setRelatedProduct(products);
      }
      setAllProducts(products);
    } catch (error) {
      toast.error("Error fetching products.");
    }
  }

  let formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: getProducts,
  });

  function getUserId() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode.jwtDecode(token);
        localStorage.setItem("idForUser", decodedToken.id);
      } catch (error) {}
    } else {
    }
  }

  useEffect(() => {
    getProducts();
    getUserId();
  }, []);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex justify-center my-5"
      >
        <div className="relative w-[80%] max-w-2xl">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            name="search"
            value={formik.values.search}
            onChange={(e) => {
              formik.handleChange(e);
              const searchTerm = e.target.value.toLowerCase();
              const filteredProducts = allProducts.filter((product) =>
                product.title.toLowerCase().includes(searchTerm)
              );
              setRelatedProduct(filteredProducts);
            }}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-12 text-sm text-gray-900 border border-gray-300 rounded-full bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-700 dark:border-green-600 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search..."
            required
          />
          <button
            type="submit"
            className="absolute end-3 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full px-5 py-2 text-sm shadow-md focus:ring-2 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500"
          >
            Search
          </button>
        </div>
      </form>

      {/* Products */}
      {!searchProduct ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-5 px-2">
          {searchProduct.map((current) => (
            <div
              key={current.id}
              className="relative bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl group"
            >
              {/* Wishlist Icon */}
              <button
                onClick={() => addWish(current.id)}
                className={`absolute top-2 right-2 z-[2000] bg-white p-2 rounded-full shadow-md transition duration-300 ${
                  wishlistStatus[current.id]
                    ? "text-red-500"
                    : "text-gray-500 hover:text-red-600"
                }`}
              >
                <i className="fas fa-heart"></i>
              </button>

              <Link
                to={`/ProductDetails/${current.category.name}/${current.id}`}
              >
                <div className="relative">
                  <img
                    src={current.imageCover}
                    alt={current.title}
                    className="w-full"
                  />
                  {current.priceAfterDiscount && (
                    <div className="absolute top-2 left-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-tr-md">
                      Sale
                    </div>
                  )}
                </div>
                <div className="p-4 pb-2">
                  <h2 className="text-xs uppercase text-gray-400 tracking-wide">
                    {current.category.name}
                  </h2>
                  <h3 className="text-lg font-bold text-gray-800 mt-2 truncate">
                    {current.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-green-600">
                      {current.priceAfterDiscount || current.price} EGP
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <i className="fas fa-star"></i>
                      <span className="text-sm font-medium ml-1 text-gray-700">
                        {current.ratingsAverage.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => addProductToCart(current.id)}
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
