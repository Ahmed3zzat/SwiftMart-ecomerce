import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export let resetContext = createContext();
export default function ResetPasswordContext({ children }) {
  let token = localStorage.getItem("token");

  const [loadForgot, setLoadForgot] = useState(false);

  const [loadVerify, setLoadVerify] = useState(false);

  const [loadReset, setLoadReset] = useState(false);

  const [ErrorApiFP, setErrorApiFP] = useState(null);

  const [ErrorApiVRC, setErrorApiVRC] = useState(null);

  const [ErrorApiRP, setErrorApiRP] = useState(null);

  const [EmailToReset, setEmailToReset] = useState(null);

  function ForgotPassword(email) {
    setLoadForgot(true);
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email,
      })
      .then((response) => {
        setLoadForgot(false);
        setEmailToReset(email);
        return true;
      })
      .catch((error) => {
        setLoadForgot(false);
        setErrorApiFP(error);
        console.log(error);
        return false;
      });
  }
  function VerifyResetCode(resetCode) {
    setLoadVerify(true);

    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode,
      })
      .then((response) => {
        setLoadVerify(false);
        return true;
      })
      .catch((error) => {
        setLoadVerify(false);
        setErrorApiVRC(error.response.data.message);
        return false;
      });
  }

  function UpdateLoggedUserPassword(currentPassword, password, rePassword) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        {
          currentPassword,
          password,
          rePassword,
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

  function ResetPassword(email, newPassword) {
    setLoadReset(false);
    return axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email,
        newPassword,
      })
      .then((response) => {
        setLoadReset(false);
        return true;
      })
      .catch((error) => {
        setErrorApiRP(error.response.data.message);
        setLoadReset(false);
        return false;
      });
  }

  function UpdateLoggedUserData(name, email, phone) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        {
          name,
          email,
          phone,
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

  return (
    <resetContext.Provider
      value={{
        ForgotPassword,
        VerifyResetCode,
        ResetPassword,
        loadForgot,
        loadVerify,
        loadReset,
        ErrorApiFP,
        ErrorApiVRC,
        ErrorApiRP,
        EmailToReset,
      }}
    >
      {children}
    </resetContext.Provider>
  );
}
