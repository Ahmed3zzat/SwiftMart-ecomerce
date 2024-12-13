import React, { useContext, useEffect, useState } from "react";
import Style from "./ResetPass.module.css";
import { useFormik } from "formik";
import ResetPhoto from "../../assets/images/ResetPassword.jpg";

import * as Yup from "yup";
import { resetContext } from "../../Context/ResetPasswordContext";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  let { ResetPassword, loadReset, ErrorApiRP, EmailToReset } =
    useContext(resetContext);
  let navigate = useNavigate();
  async function handelSubmit(values) {
    let flag = await ResetPassword(values.email, values.rePassword);
    if (flag) {
      navigate("/login");
    } else {
      console.log(flag);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    rePassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: EmailToReset,
      rePassword: "",
    },
    validationSchema,
    onSubmit: handelSubmit,
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-700 dark:from-gray-800 dark:to-gray-900">
        <div className="bg-white shadow-xl rounded-lg max-w-lg w-full p-6 dark:bg-gray-800">
          <div className="text-center">
            <img
              src={ResetPhoto}
              alt="Reset Password "
              className="mx-auto w-36 h-36 object-cover rounded-full shadow-md"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4 dark:text-white">
              Reset Password
            </h2>
            {ErrorApiRP ? (
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                {ErrorApiRP}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                Please enter your email and a new password to reset your
                account.
              </p>
            )}
          </div>

          {/* Form Section */}
          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-6">
            {/* Email Field */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="ema"
                className="block py-3 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:text-white dark:border-gray-600 dark:focus:border-green-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="ema"
                className="absolute text-sm text-gray-500 bg-white pb-1 px-1 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-1 left-4 origin-[0] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-5"
              >
                User Email
              </label>
            </div>
            {formik.touched.email && formik.errors.email && (
              <div
                className="p-2 text-sm text-red-800 rounded-md bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}

            {/* Password Field */}
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="rePass"
                className="block py-3 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:text-white dark:border-gray-600 dark:focus:border-green-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="rePass"
                className="absolute text-sm bg-white pb-1 px-1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-1 left-4 origin-[0] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-5"
              >
                New Password
              </label>
            </div>
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div
                className="p-2 text-sm text-red-800 rounded-md bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={!formik.dirty || !formik.isValid}
              type="submit"
              className="w-full py-3 text-sm font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {!loadReset ? (
                "Reset Password"
              ) : (
                <i className="fas fa-spin fa-spinner"></i>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
