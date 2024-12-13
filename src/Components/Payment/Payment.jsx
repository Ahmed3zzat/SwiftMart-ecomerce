import React, { useContext, useEffect, useState } from "react";
import Style from "./Payment.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";

export default function Payment() {
  const { cartID } = useContext(cartContext);
  const [ErrorApi, setErrorApi] = useState(null);
  const [Loading1, setLoading1] = useState(false);
  const [Loading2, setLoading2] = useState(false);
  const [Flag, setFlag] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Validation schema
  const validationSchema = Yup.object().shape({
    shippingAddress: Yup.object().shape({
      details: Yup.string().required("Details are required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(
          /^01[0125][0-9]{8}$/,
          "Phone number must start with 010, 011, 012, or 015 and be 11 digits long"
        ),
      city: Yup.string()
        .oneOf(
          [
            "Luxor",
            "Cairo",
            "ToursEgypt",
            "Giza",
            "Marsa Alam",
            "Alexandria",
            "luxor",
            "cairo",
            "toursEgypt",
            "giza",
            "marsa alam",
            "alexandria",
          ],
          "must contain cities and towns in Egypt."
        )
        .required("City is required"),
    }),
  });

  // Form submission
  async function handleCashPayment(OBJ) {
    setLoading1(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        {
          shippingAddress: OBJ.shippingAddress.values,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        setLoading1(false);
        navigate("/allorders");
      })
      .catch((error) => {
        setLoading1(false);
        setErrorApi(error.response.data.message);
      });
  }

  function handelOnlinePayment(OBJ) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
        {
          shippingAddress: OBJ.shippingAddress.values,
        },
        {
          headers: {
            token,
          },
          params: {
            url: location.origin,
          },
        }
      )
      .then((response) => {
        setLoading2(false);
        console.log(response);
        window.open(response.data.session.url, "_self");
      })
      .catch((error) => {
        setLoading2(false);
        setErrorApi(error.response.data.message);
      });
  }

  function handelPayment(values) {
    let OBJ = {
      shippingAddress: values,
    };
    if (Flag) {
      handelOnlinePayment(OBJ);
    } else {
      handleCashPayment(OBJ);
    }
  }
  // Formik configuration
  const myFormik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: handelPayment,
  });
  useEffect(() => {}, [localStorage.getItem("idForUser")]);

  return (
    <>
      {ErrorApi && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {ErrorApi}
        </div>
      )}

      <h2 className="text-center font-medium tracking-wider text-lg">
        Complete Payment
      </h2>
      <form onSubmit={myFormik.handleSubmit} className="max-w-xl mx-auto mt-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormik.values.shippingAddress.details}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            name="shippingAddress.details"
            id="detail"
            className="block py-2.5 mt- px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="detail"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Details
          </label>
        </div>
        {myFormik.touched.shippingAddress?.details &&
        myFormik.errors.shippingAddress?.details ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormik.errors.shippingAddress.details}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormik.values.shippingAddress.phone}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="tel"
            name="shippingAddress.phone"
            id="phone"
            className="block py-2.5 mt- px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Phone
          </label>
        </div>
        {myFormik.touched.shippingAddress?.phone &&
        myFormik.errors.shippingAddress?.phone ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormik.errors.shippingAddress.phone}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormik.values.shippingAddress.city}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            name="shippingAddress.city"
            id="city"
            className="block py-2.5 mt- px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User City
          </label>
        </div>
        {myFormik.touched.shippingAddress?.city &&
        myFormik.errors.shippingAddress?.city ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormik.errors.shippingAddress.city}
          </div>
        ) : null}

        <div className="buttons flex items-center justify-center gap-5">
          <button
            onClick={() => {
              setFlag(false);
            }}
            disabled={!myFormik.isValid || !myFormik.dirty}
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {Loading1 ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Cash Payment"
            )}
          </button>

          <button
            onClick={() => {
              setFlag(true);
            }}
            disabled={!myFormik.isValid || !myFormik.dirty}
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {Loading2 ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Online Payment"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
