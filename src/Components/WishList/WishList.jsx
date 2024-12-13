import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";
import { wishContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import emptyWishListImage from "../../assets/images/wishlistEmpty.jpg";

export default function WishList() {
  let { addCart } = useContext(cartContext);

  let { GetWishlist, RemoveProductWishlist, wishlists } =
    useContext(wishContext);


  async function removeWishProduct(id) {
    let flag = await RemoveProductWishlist(id);
    if (flag) {
      toast.success("Your item has been removed.");
    } else {
      toast.error("Error removing your product to the wishlist");
    }
  }
  async function addProductToCart(id) {
    let flag = await addCart(id);
    if (flag) {
      toast.success("Product added successfully to your wishlist");
    } else {
      toast.error("Error adding your product to the wishlist");
    }
  }
  useEffect(() => {
    GetWishlist();
  }, [wishlists]);

  if (wishlists?.length == 0 || wishlists == null) {
    return (
      <>
        <div className="flex flex-col justify-end items-center gap-1">
          <img className="w-full" src={emptyWishListImage} alt="" />
          <h2 className="text-3xl font-bold text-center tracking-wide font-fontBar text-green-600">
            NO ITEMS IN WISH LIST
          </h2>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          My Wishlist
        </h2>
        <div className="grid grid-cols-1 gap-8">
          <>
            {wishlists && wishlists.length > 0 ? (
              wishlists.map((current, index) => (
                <div
                  key={current.id || `wishlist-item-${index}`} // Use a unique identifier
                  className="flex overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <img
                    src={current.imageCover}
                    alt={current.title}
                    className="w-32 h-32 object-cover rounded-lg mr-6"
                  />
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {current.title}
                    </h3>

                    <h3 className="text-sm text-gray-500 line-clamp-2">
                      {current.description}
                    </h3>

                    <div className="mt-2 flex items-center text-yellow-500">
                      {current.ratingsAverage}
                      <i className="fa-solid fa-star ml-1"></i>
                    </div>

                    <div className="mt-4">
                      {current.priceAfterDiscount ? (
                        <span className="text-green-600 text-md">
                          EGP{" "}
                          <span className="text-sm font-bold items-baseline">
                            {current.priceAfterDiscount}
                          </span>
                        </span>
                      ) : (
                        <span className="text-green-600 text-md">
                          EGP{" "}
                          <span className="text-xs font-bold items-baseline">
                            {current.price}
                          </span>
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      <span>
                        <i className="fa-solid fa-cart-arrow-down pe-1 text-green-500"></i>
                      </span>
                      {current.sold}+ Sold recently
                    </p>

                    <p className="mt-1 text-sm flex items-center">
                      <i className="fa-solid fa-truck-fast mr-2 text-blue-600"></i>{" "}
                      Free delivery
                    </p>

                    <div className="m-4 flex flex-col md:flex-row gap-2">
       
                      <button
                        onClick={() => removeWishProduct(current.id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center"
                      >
                        <i className="fa-solid fa-trash mr-1 "></i> Remove
                      </button>
                      <button
                        onClick={() => addProductToCart(current.id)}
                        className="flex-grow bg-green-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-green-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg">
                Loading...
              </p>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
