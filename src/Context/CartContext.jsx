import axios from "axios";
import React from "react";
import { useState } from "react";
import { createContext } from "react";

export let cartContext = createContext();

export default function CartContext({ children }) {
  const [carts, setCarts] = useState(null);
  const [totalNumber, setTotalNumber] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartID, setCartID] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [CounterCart, setCounter] = useState(
    localStorage.getItem("counterCart")
  );
  const [LoadCart, setLoadCart] = useState(false);

  //   start get cart
  async function getCarts() {
    setLoadCart(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCartID(response.data.cartId);
        setCarts(response.data.data.products);
        setTotalNumber(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        setCounter(response.data.data.products.length);
        setLoadCart(false);
      })
      .catch((error) => {
        setLoadCart(false);
      });
  }
  //   end get cart

  //   start post cart
  async function addCart(productId) {
    setLoadCart(true);
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
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
        localStorage.setItem("counterCart", response.data.data.products.length);
        setCounter(response.data.data.products.length);
        setLoadCart(false);
        return true;
      })
      .catch((error) => {
        setLoadCart(false);

        return false;
      });
  }
  //   end post cart

  //   Start Update
  async function updateQuantity(id, count) {
    setButtonLoading(true);
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setButtonLoading(false);
        setCarts(response.data.data.products);
        setTotalNumber(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        setCounter(response.data.data.products.length);
        localStorage.setItem("counterCart", response.data.data.products.length);
        setLoadCart(false);

        return true;
      })
      .catch((error) => {
        setButtonLoading(false);
        return false;
      });
  }
  //   End Update

  //Start Remove
  async function removeCart(id) {
    setLoadCart(true);
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCarts(response.data.data.products);
        setTotalNumber(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        setCounter(response.data.data.products.length);
        localStorage.setItem("counterCart", response.data.data.products.length);
        setLoadCart(false);

        return true;
      })
      .catch((error) => {
        return false;
      });
  }
  //   End Remove

  //Start clear
  async function clearCart() {
    setLoadCart(true);
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCarts(null);
        setTotalNumber(0);
        setTotalPrice(0);
        setCounter(0);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
  //   End clear

  return (
    <>
      <cartContext.Provider
        value={{
          addCart,
          getCarts,
          carts,
          totalNumber,
          totalPrice,
          updateQuantity,
          removeCart,
          clearCart,
          cartID,
          buttonLoading,
          CounterCart,
          LoadCart,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
