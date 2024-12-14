import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export let wishContext = createContext();

export default function WishlistContext({ children }) {
  const [wishlists, setWishlist] = useState(null);
  const [counterWishlist, setCounterHeart] = useState(
    localStorage.getItem("CounterWishlist")
  );

  async function GetWishlist() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setWishlist(response.data.data);
        setCounterHeart(response.data.data.length);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  async function AddProductWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        localStorage.setItem("CounterWishlist", response.data.data.length);
        setCounterHeart(response.data.data.length);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  async function RemoveProductWishlist(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setWishlist(response.data.data);
        setCounterHeart(response.data.data.length);
        localStorage.setItem("CounterWishlist", response.data.data.length);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  return (
    <wishContext.Provider
      value={{
        AddProductWishlist,
        RemoveProductWishlist,
        GetWishlist,
        wishlists,
        counterWishlist,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
