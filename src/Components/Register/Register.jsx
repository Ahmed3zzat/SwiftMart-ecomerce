import React, { useContext, useEffect, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import jwtDecode from 'jwt-decode'; // Corrected import
// import Cookies from 'js-cookie';
import { userContext } from "../../Context/UserContext";

export default function Register() {
  let { setToken } = useContext(userContext);
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  // const handleToken = (token) => {
  //   try {
  //     const decodedToken = jwtDecode(token);
  //     const userId = decodedToken.id || decodedToken.userId;
  //     Cookies.set("authToken", token, { expires: 7 });
  //     Cookies.set("userId", userId, { expires: 7 });
  //     console.log("Token and User ID saved:", userId);
  //   } catch (error) {
  //     console.error("Failed to decode token:", error);
  //   }
  // };

  // Start submit Form
  async function handelRegister(values) {
    setLoading(true);
    // send to back end
    // API -> https://documenter.getpostman.com/view/5709532/2s93JqTRWN
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((response) => {
        navigate("/");
        setLoading(false);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        // handleToken(response.data.token);
      })
      .catch((res) => {
        setMessage(res.response.data.message);
        setLoading(false);
      });
  }
  // End submit Form

  // Start Validation
  // function validations(values) {
  //   let errors = {};

  //   if (values.name == "") {
  //     errors.name = "name is required";
  //   } else if (!/^[a-zA-Z]{3,}$/.test(values.name)) {
  //     errors.name = `Please valid name`;
  //   }

  //   if (values.phone == "") {
  //     errors.phone = "phone is required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = `Please valid number`;
  //   }

  //   if (values.email == "") {
  //     errors.email = "email is required";
  //   } else if (
  //     !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //       values.email
  //     )
  //   ) {
  //     errors.email = `Please include an '@' in the email address, '${values.email}' is missing an '@`;
  //   }

  //   if (values.password == "") {
  //     errors.password = "password is required";
  //   } else if (
  //     !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)
  //   ) {
  //     errors.password =
  //       "Minimum eight characters, at least one letter and one number:";
  //   }
  //   if (values.rePassword == "") {
  //     errors.rePassword = "re-password is required";
  //   } else if (
  //     !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.rePassword)
  //   ) {
  //     errors.rePassword =
  //       "Minimum eight characters, at least one letter and one number:";
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = "re-password not matched";
  //   }

  //   return errors;
  // }
  // End Validation

  // Start Validation
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must contain at least three letter")
      .max(25, "Name must contain at maximum of twenty five letter")
      .required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password number is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: Yup.string()
      .required("Re-Password number is required")
      .min(8, "Re-Password must be at least 8 characters")
      .oneOf([Yup.ref("password")], "Re-Password must matches with Password"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^01[0125][0-9]{8}$/,
        "Phone number must start with 010, 011, 012, or 015 and be 11 digits long"
      ),
  });

  // End Validation

  let myFormikRegistration = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      // address: "" ---> because not exist in database
    },
    // validate: validations,
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      {message ? (
        <div
          className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {message}
        </div>
      ) : null}
      <h2 className="text-center font-medium tracking-wider text-lg">
        Register now:{" "}
      </h2>

      <form
        onSubmit={myFormikRegistration.handleSubmit}
        className="max-w-xl mx-auto mt-6"
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            onBlur={myFormikRegistration.handleBlur}
            value={myFormikRegistration.values.name}
            onChange={myFormikRegistration.handleChange}
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            user Name
          </label>
        </div>
        {myFormikRegistration.touched.name &&
        myFormikRegistration.errors.name ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormikRegistration.errors.name}
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormikRegistration.values.email}
            onChange={myFormikRegistration.handleChange}
            onBlur={myFormikRegistration.handleBlur}
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        {myFormikRegistration.touched.email &&
        myFormikRegistration.errors.email ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormikRegistration.errors.email}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-6 group">
          <input
            onBlur={myFormikRegistration.handleBlur}
            value={myFormikRegistration.values.phone}
            onChange={myFormikRegistration.handleChange}
            type="tel"
            name="phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        {myFormikRegistration.touched.phone &&
        myFormikRegistration.errors.phone ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormikRegistration.errors.phone}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormikRegistration.values.password}
            onChange={myFormikRegistration.handleChange}
            onBlur={myFormikRegistration.handleBlur}
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            password
          </label>
        </div>
        {myFormikRegistration.touched.password &&
        myFormikRegistration.errors.password ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormikRegistration.errors.password}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormikRegistration.values.rePassword}
            onChange={myFormikRegistration.handleChange}
            onBlur={myFormikRegistration.handleBlur}
            type="password"
            name="rePassword"
            id="floating_rePassword"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Re-Password
          </label>
        </div>
        {myFormikRegistration.touched.rePassword &&
        myFormikRegistration.errors.rePassword ? (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormikRegistration.errors.rePassword}
          </div>
        ) : null}

        <button
          disabled={
            !myFormikRegistration.isValid || !myFormikRegistration.dirty
              ? true
              : false
          }
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {Loading ? <i className="fas fa-spin fa-spinner"></i> : "Submit"}
        </button>
      </form>
    </>
  );
}
