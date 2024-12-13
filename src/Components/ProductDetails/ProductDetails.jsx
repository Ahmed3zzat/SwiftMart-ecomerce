import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "./ProductDetails.module.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wishContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  const { productId, categoryProduct } = useParams();
  const [RelatedCategory, setRelatedCategory] = useState(null);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [ErrorMessage2, setErrorMessage2] = useState("");
  const navigate = useNavigate();

  const { addCart } = useContext(cartContext);
  let { AddProductWishlist } = useContext(wishContext);

  const [wishlistStatus, setWishlistStatus] = useState({});

  async function addProductToCart(id) {
    let flag = await addCart(id);
    if (flag) {
      toast.success("Product added successfully to your cart");
    } else {
      toast.error("Error adding your product to the cart");
    }
  }

  async function productDetails(id) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setDetails(response.data.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error fetching product details."
      );
    }
  }

  async function getProducts(cate) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const related = response.data.data.filter(
        (current) => current.category.name === cate
      );
      setRelatedCategory(related);
    } catch (error) {
      setErrorMessage2(
        error.response?.data?.message || "Error fetching related products."
      );
    }
  }
  const toggleWishlist = (id) => {
    setWishlistStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  async function addWish(id) {
    let flag = await AddProductWishlist(id);
    if (flag) {
      toast.success(`Your item has been added.`);
      toggleWishlist(id);
    } else {
      toast.error("Error adding your product to the wishlist");
    }
  }
  useEffect(() => {
    productDetails(productId);
    getProducts(categoryProduct);
  }, [productId, categoryProduct]);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
  }, []);

  const handleThumbnailClick = (index) => {
    nav1.slickGoTo(index); // Moves the top slider to the clicked image
  };

  if (ErrorMessage || ErrorMessage2) {
    return <p className="text-red-600 text-center text-xl">Check your data</p>;
  }

  return (
    <>
      {!details ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-3">
          <div className="slider-container">
            {details.images?.length > 0 && (
              <>
                <Slider asNavFor={nav2} ref={sliderRef1}>
                  {details.images.map((ele, index) => (
                    <div
                      className="relative bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl group"
                      key={index}
                    >
                      <img src={ele} alt={`Slide ${index}`} />
                    </div>
                  ))}
                </Slider>
                <Slider
                  asNavFor={nav1}
                  ref={sliderRef2}
                  slidesToShow={3}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  className="mt-3"
                >
                  {details.images.map((ele, index) => (
                    <div
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img
                        src={ele}
                        alt={`Thumbnail ${index}`}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </Slider>
              </>
            )}
          </div>

          <div className="overflow-hidden ps-5 relative">
            {/* Wishlist Icon */}
            <button
              onClick={() => {
                addWish(details.id);
              }}
              className={`absolute top-2 right-2 z-[2000] bg-white p-2 rounded-full shadow-md transition duration-300 ${
                wishlistStatus[details.id]
                  ? "text-red-500 translate-y-[0]"
                  : "text-gray-500 hover:text-red-600"
              }`}
            >
              <i className="fas fa-heart"></i>
            </button>
            <h2 className="text-lg font-mono">
              {details.title.split(" ", 2).join(" ")}
            </h2>
            <p className="text-green-500">{details.category.name}</p>
            <p className="text-gray-400 my-3">{details.description}</p>
            <div className="flex items-center justify-between mt-4 text-sm">
              {details.priceAfterDiscount ? (
                <>
                  <span className="text-green-600 ">
                    {details.priceAfterDiscount} EGP
                  </span>
                  <span className="line-through ps-2 text-red-600">
                    {details.price} EGP
                  </span>
                </>
              ) : (
                <span className="text-green-600 inline-block">
                  {details.price} EGP
                </span>
              )}

              <div className="flex items-center text-yellow-400">
                <i className="fas fa-star"></i>
                <span className="text-sm font-medium ml-1 text-gray-700">
                  {details.ratingsAverage.toFixed(1)}
                </span>
              </div>
            </div>
            <button
              onClick={() => addProductToCart(details.id)}
              className="w-full border border-2 border-green-600 py-2 mt-4 text-sm font-medium rounded-b-xl hover:bg-green-600 hover:text-white transition duration-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {RelatedCategory ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 gap-y-0 px-2">
          {RelatedCategory.map((current) => (
            <div
              key={current.id}
              className="relative bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl group my-20"
            >
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
                <div className="relative">
                  <img
                    src={current.imageCover}
                    alt={current.title}
                    className="w-full"
                  />
                  {current.priceAfterDiscount && (
                    <div className="absolute top-2 left-0">
                      <div className="relative w-0 h-0 border-l-[40px] border-t-[10px] border-b-[10px] border-r-[10px] border-l-green-500 border-t-green-500 border-r-transparent border-b-green-500">
                        <span className="absolute font-fontBody top-[50%] start-[-5px] translate-x-[-100%] translate-y-[-50%] text-white text-xs font-bold">
                          Sale
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
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
                </div>
              </Link>
              <button
                onClick={() => addProductToCart(current.id)}
                className="w-full border border-2 border-green-600 py-2 mt-4 text-sm font-medium rounded-b-xl hover:bg-green-600 hover:text-white transition duration-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
