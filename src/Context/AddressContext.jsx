import axios from "axios";
import React from "react";

export default function AddressContext(name, details, phone, city) {
  let token = localStorage.getItem("token");
  function addAddress() {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        {
          name,
          details,
          phone,
          city,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  function removeAddress(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  function getSpecificAddress(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  function getLoggedAddress() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  return <div>AddressContext</div>;
}
