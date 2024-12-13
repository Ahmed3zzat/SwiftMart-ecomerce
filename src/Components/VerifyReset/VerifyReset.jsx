import React, { useContext, useEffect, useState } from "react";
import Style from "./VerifyReset.module.css";
import { useNavigate } from "react-router-dom";
import { resetContext } from "../../Context/ResetPasswordContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import verifyCode from "../../assets/images/verifyCode.jpg";

export default function VerifyReset() {
  let navigate = useNavigate();

  let { VerifyResetCode, loadVerify, ErrorApiVRC } = useContext(resetContext);

  async function handelSubmit(values) {
    let flag = await VerifyResetCode(values.code);
    if (flag) {
      navigate("/login/resetPassword");
    } else {
      console.log(flag);
    }
  }
  let validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
  });
  let formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: handelSubmit,
  });
  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-green-600">
  <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-4xl flex items-center justify-between">

    <div className="w-1/2 flex justify-center">
      <img src={verifyCode} alt="Verification Code" className="w-full" />
    </div>

    <div className="w-1/2 pl-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reset Code</h2>
        {ErrorApiVRC && (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {ErrorApiVRC}
          </div>
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="code"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-100 dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="code"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Verification Code
          </label>
        </div>

        {formik.touched.code && formik.errors.code && (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.code}
          </div>
        )}

        <button
          disabled={!(formik.dirty && formik.isValid)}
          type="submit"
          className="w-full bg-green-700 hover:bg-green-600 text-white font-medium rounded-lg text-sm py-2.5 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {!loadVerify ? (
            "Verify"
          ) : (
            <i className="fas fa-spin fa-spinner"></i>
          )}
        </button>
      </form>
    </div>
  </div>
</div>

  );
}
