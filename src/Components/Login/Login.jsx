import React, { useContext, useEffect, useState } from "react";
import swift from "../../assets/images/swiftMart1.jpg";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { userContext } from "../../Context/UserContext";

export default function Login() {
  const [ErrorApi, setErrorApi] = useState(null);

  let navigate = useNavigate();

  const [Loading, setLoading] = useState(false);

  let { setToken } = useContext(userContext);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  // start handel Token



  // end  handel Token
  async function submitForm(values) {
    setLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((response) => {
        setLoading(false);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        setErrorApi(error.response.data.message);
        setLoading(false);
      });
  }

  


  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-[85%] md:w-[90%]">
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-green-600 to-green-800 text-white w-1/2 p-8">
          <img src={swift} alt="SwiftMart" className="w-52 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Welcome to SwiftMart!</h1>
          <p className="text-lg text-center">
            Your trusted e-commerce platform for all your needs.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full md:w-1/2 p-8 flex flex-col justify-center"
        >
          {ErrorApi && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {ErrorApi}
            </div>
          )}

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login Now
          </h2>

          <div className="relative mb-4">
            <input
              type="text"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full p-3 text-sm text-gray-800 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              placeholder="Enter your email"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full p-3 text-sm text-gray-800 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              placeholder="Enter your password"
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={`w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 ${
              Loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {Loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            <Link to={"forgetPassword"} className="text-green-600">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
