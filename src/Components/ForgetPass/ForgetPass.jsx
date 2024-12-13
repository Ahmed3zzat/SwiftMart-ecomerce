import React, { useContext, useEffect, useState } from "react";
import { resetContext } from "../../Context/ResetPasswordContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import forget from "../../assets/images/forgetPasswordImage.webp";

export default function ForgetPass() {
  let navigate = useNavigate();

  let { ForgotPassword, loadForgot, ErrorApiFP } = useContext(resetContext);

  async function handelSubmit(values) {
    let flag = await ForgotPassword(values.email);
    if (flag) {
      navigate("/login/resentCode");
    } else {
      console.log(flag);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handelSubmit,
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
      {/* Image Section */}
      <div className="mb-6">
        <img
          src={forget}
          alt="Verification Code"
          className="w-48 h-48 rounded-full"
        />
      </div>

      <div className="bg-white w-full sm:w-96 p-8 rounded-lg shadow-lg ">
        {ErrorApiFP && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {ErrorApiFP}
          </div>
        )}

        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="emailll"
              className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="emailll"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 left-4 origin-[0] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-5"
            >
              User Email
            </label>
          </div>

          {/* Error Message for Email */}
          {formik.touched.email && formik.errors.email && (
            <div
              className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}

          {/* Submit Button */}
          <button
            disabled={!(formik.dirty && formik.isValid)}
            type="submit"
            className="w-full px-5 py-3 bg-green-700 text-white font-medium rounded-lg text-sm focus:ring-4 focus:outline-none focus:ring-green-300 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50"
          >
            {!loadForgot ? (
              "Send Code"
            ) : (
              <i className="fas fa-spinner fa-spin"></i>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
